# Arquitectura en capas · API de ScoreSound

Semana 6 · Corte 2 · Desarrollo Fullstack · CORHUILA

## El caso

ScoreSound es una app para músicos que practican solos. El usuario sube
el PDF de una partitura, la app lo interpreta y lo reproduce, y trae un
metrónomo integrado. Todo queda guardado en una biblioteca personal.

Este documento describe cómo se organizaría el backend de esa app en
las cuatro capas de Spring Boot.

## Diagrama de capas

```
                POST /api/partituras
                (titulo, instrumento, archivo PDF)
                            │
                            ▼
  ┌──────────────────────────────────────────────────────────┐
  │  CONTROLLER · PartituraController                        │
  │  Recibe la peticion HTTP y devuelve la respuesta en JSON │
  └──────────────────────────────────────────────────────────┘
        │                                        ▲
        │ llama al service                       │ 201 Created + JSON
        ▼                                        │
  ┌──────────────────────────────────────────────────────────┐
  │  SERVICE · PartituraService                              │
  │  Reglas del negocio: validaciones, duplicados, archivo   │
  └──────────────────────────────────────────────────────────┘
        │                                        ▲
        │ pide guardar                           │ objeto Partitura ya guardado
        ▼                                        │
  ┌──────────────────────────────────────────────────────────┐
  │  REPOSITORY · PartituraRepository                        │
  │  Lee y escribe en la base de datos                       │
  └──────────────────────────────────────────────────────────┘
        │                                        ▲
        │ INSERT / SELECT                        │ filas convertidas en objetos
        ▼                                        │
  ┌──────────────────────────────────────────────────────────┐
  │  ENTITY · Partitura                                      │
  │  Modela la tabla "partituras" · una fila = un objeto     │
  └──────────────────────────────────────────────────────────┘
                            │
                            ▼
                  [ Base de datos ]
```

Las flechas van en dos sentidos a propósito: la petición **baja** de
capa en capa, y el resultado **sube** de vuelta hasta que el controller
lo entrega convertido en JSON.

## Responsabilidad de cada capa

### Entity · `Partitura`

Representa la tabla `partituras`. Cada fila de esa tabla se convierte
en un objeto `Partitura` en Java.

Campos que tendría:

| Campo | Tipo | Para qué |
|---|---|---|
| `id` | Long | Identificador único, generado por la base de datos |
| `titulo` | String | Nombre de la pieza |
| `compositor` | String | Autor de la obra |
| `instrumento` | String | Batería, guitarra, congas, timbales |
| `tonalidad` | String | Do mayor, La menor, etc. |
| `rutaArchivo` | String | Dónde quedó guardado el PDF en el servidor |
| `procesada` | boolean | Si el PDF ya se pudo convertir a notas |
| `fechaSubida` | LocalDateTime | Cuándo se subió |
| `usuarioId` | Long | De quién es la partitura |

Una decisión de diseño que vale la pena señalar: **el PDF no se guarda
dentro de la base de datos**, solo su ruta. Los archivos van al disco
del servidor y la tabla se queda liviana.

La entity no tiene lógica. Solo describe la forma del dato.

### Repository · `PartituraRepository`

Es el único que habla con la base de datos. No decide nada, solo
ejecuta consultas.

Operaciones que necesitaría ScoreSound:

- `save(partitura)` — guardar una partitura nueva o actualizar una existente
- `findByUsuarioId(usuarioId)` — traer la biblioteca de un usuario
- `findById(id)` — traer una sola para reproducirla
- `existsByTituloAndUsuarioId(titulo, usuarioId)` — saber si ya existe
- `findByInstrumento(instrumento)` — filtrar la biblioteca
- `deleteById(id)` — borrar

En Spring Boot la mayoría de estas ni hay que escribirlas: se heredan
de `JpaRepository`, y las demás se generan solas a partir del nombre
del método.

### Service · `PartituraService`

Aquí vive todo lo que hace especial a ScoreSound. Es la capa con más
código propio y la que hay que probar con más cuidado.

Reglas concretas de este caso:

1. **El archivo tiene que ser un PDF** y no pasar del tamaño máximo.
   Si no cumple, se rechaza antes de tocar la base de datos.
2. **No se permiten partituras duplicadas** para el mismo usuario. Si
   ya tiene "Creep" guardada, no se vuelve a subir.
3. **El título se normaliza** antes de guardarlo: se quitan espacios
   sobrantes y se corrige el uso de mayúsculas, para que la biblioteca
   no quede con "creep", "Creep " y "CREEP" como si fueran distintas.
4. **El archivo se guarda en disco** y se arma la ruta que después se
   registra en la base de datos.
5. **Se manda el PDF al conversor** que extrae las notas. Y aquí hay
   una decisión de negocio importante: si la conversión falla, la
   partitura **igual se guarda**, pero marcada como no procesada. Así
   el usuario no pierde el archivo que subió, y puede reintentar la
   conversión más tarde.
6. **Se completan los datos automáticos**: la fecha de subida y el
   usuario dueño.

Nada de esto podría estar en el controller ni en el repository. El
controller solo entiende de HTTP y el repository solo de consultas.

### Controller · `PartituraController`

Es la cara pública de la API. Traduce entre el mundo HTTP y el mundo
Java, y nada más.

Lo que hace:

- Expone las rutas y las asocia con un método.
- Revisa que la petición traiga lo mínimo (que venga el archivo, que
  venga el título).
- Llama al service y espera el resultado.
- Convierte ese resultado en JSON.
- Traduce lo que pasó a un código de estado HTTP.

Lo que **no** hace: no valida reglas de negocio, no guarda archivos y
no consulta la base de datos.

## Endpoint de ejemplo: subir una partitura

**`POST /api/partituras`**

Se envía el título, el instrumento y el archivo PDF. Recorrido completo:

| Paso | Capa | Qué ocurre |
|---|---|---|
| 1 | Controller | Llega la petición. Revisa que vengan el archivo y el título; si falta algo, responde 400 y no sigue |
| 2 | Controller | Llama a `partituraService.subir(datos, archivo)` |
| 3 | Service | Verifica que el archivo sea PDF y no exceda el tamaño |
| 4 | Service | Pregunta al repository si ese título ya existe para el usuario |
| 5 | Repository | Ejecuta la consulta y responde sí o no |
| 6 | Service | Si ya existe, corta el proceso y avisa al controller |
| 7 | Service | Guarda el PDF en disco, normaliza el título e intenta convertirlo a notas |
| 8 | Service | Arma el objeto `Partitura` con todos sus campos y se lo pasa al repository |
| 9 | Repository | Hace el INSERT en la tabla `partituras` |
| 10 | Entity | La fila insertada regresa como objeto, ya con su `id` |
| 11 | Service | Devuelve ese objeto al controller |
| 12 | Controller | Responde **201 Created** con la partitura en JSON |

Respuesta cuando todo sale bien:

```json
{
  "id": 14,
  "titulo": "Creep",
  "compositor": "Radiohead",
  "instrumento": "Guitarra",
  "tonalidad": "Sol mayor",
  "procesada": true,
  "fechaSubida": "2026-08-30T15:42:00"
}
```

Y las respuestas cuando algo falla:

| Situación | Código | Quién lo detectó |
|---|---|---|
| Falta el archivo o el título | 400 Bad Request | Controller |
| El archivo no es un PDF | 400 Bad Request | Service |
| Esa partitura ya está en la biblioteca | 409 Conflict | Service |
| Falló al escribir en disco o en la base de datos | 500 Internal Server Error | Service / Repository |

Nota que **el controller es el único que habla en códigos HTTP**. El
service reporta qué pasó en términos del negocio y el controller lo
traduce. Por eso el service se podría reutilizar tal cual si mañana la
app se conectara por otro medio que no sea HTTP.

## Los demás endpoints

| Método y ruta | Qué hace | Capas que recorre |
|---|---|---|
| `GET /api/partituras` | Trae la biblioteca del usuario | Controller → Service → Repository → Entity |
| `GET /api/partituras/{id}` | Trae una para reproducirla | Controller → Service → Repository → Entity |
| `POST /api/partituras` | Sube una nueva | Las cuatro (detallado arriba) |
| `PUT /api/partituras/{id}` | Corrige título, instrumento o notas | Controller → Service → Repository → Entity |
| `DELETE /api/partituras/{id}` | La saca de la biblioteca | Controller → Service → Repository → Entity |

El metrónomo no aparece en esta tabla a propósito: corre completo en el
frontend y nunca toca el backend.

## Por qué no saltarse el service

Sería más corto que el controller llamara directo al repository, pero
en este caso se rompería enseguida:

- Las reglas de ScoreSound (que sea PDF, que no se duplique, qué hacer
  si falla la conversión) quedarían regadas dentro del controller, y
  habría que repetirlas en cada endpoint que las necesite.
- No se podrían probar sin levantar el servidor y hacer peticiones HTTP
  de verdad.
- Si mañana cambia la base de datos, habría que tocar el controller,
  que no tiene nada que ver con eso.

Manteniendo las capas, cada pieza se prueba y se cambia por separado.
