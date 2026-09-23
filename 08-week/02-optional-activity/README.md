# Actividad Semana 08 — CRUD REST completo (Entity, Repository, Service, Controller)

**Caso elegido:** Recetas Favoritas (extensión del Buscador de Recetas)

## 1. Entity: `RecetaFavorita`

La clase `RecetaFavorita` se mapea a una tabla con JPA (ver
[`RecetaFavorita.java`](./RecetaFavorita.java)):

- `@Entity` → convierte la clase en una tabla (`receta_favorita`).
- `@Id` + `@GeneratedValue` → `id` es la clave primaria y se autogenera.
- Cada atributo (`mealId`, `nombre`, `categoria`, `area`, `imagenUrl`) se
  mapea a una columna de la tabla.

## 2. Repository: `RecetaFavoritaRepository`

Extiende `JpaRepository<RecetaFavorita, Long>` (ver
[`RecetaFavoritaRepository.java`](./RecetaFavoritaRepository.java)), por lo
que obtiene gratis:

- `save(receta)` — guarda o actualiza.
- `findAll()` — lista todas.
- `findById(id)` — busca una por id.
- `deleteById(id)` — borra por id.

Además se declaró una consulta por método:

```java
List<RecetaFavorita> findByCategoria(String categoria);
```

Spring Data interpreta el nombre del método y genera el SQL automáticamente
(equivale a `SELECT * FROM receta_favorita WHERE categoria = ?`), sin
escribir una sola línea de SQL.

## 3. CRUD — qué uso y para qué

Implementado en [`RecetaFavoritaService.java`](./RecetaFavoritaService.java).

| Operación | Método usado | Para qué la usaría |
|---|---|---|
| **Create** | `repo.save(receta)` | Guardar una receta nueva como favorita cuando el usuario la marca desde el buscador. |
| **Read** | `repo.findAll()` / `repo.findById(id)` / `repo.findByCategoria(categoria)` | Listar todas las recetas favoritas, ver el detalle de una, o filtrarlas por categoría (ej. "Dessert"). |
| **Update** | `repo.save(receta)` (con un `id` ya existente) | Actualizar los datos de una receta favorita ya guardada. |
| **Delete** | `repo.deleteById(id)` | Quitar una receta de la lista de favoritas cuando el usuario la desmarca. |

`save()` sirve tanto para crear como para actualizar: si el objeto no tiene
`id`, JPA inserta una fila nueva; si ya tiene un `id` existente, actualiza
la fila correspondiente.

## 4. Controller: `RecetaFavoritaController`

Expone los endpoints REST (ver
[`RecetaFavoritaController.java`](./RecetaFavoritaController.java)),
usando el sustantivo en plural `/recetas-favoritas` como recurso y el
método HTTP para indicar la acción:

| Método | URL | Acción |
|---|---|---|
| GET | `/recetas-favoritas` | Listar todas |
| GET | `/recetas-favoritas/{id}` | Obtener una por id |
| GET | `/recetas-favoritas/categoria/{categoria}` | Filtrar por categoría |
| POST | `/recetas-favoritas` | Crear |
| PUT | `/recetas-favoritas/{id}` | Actualizar |
| DELETE | `/recetas-favoritas/{id}` | Borrar |

El controller solo recibe la petición y llama al service — no contiene
lógica de negocio ni accede directo al repository.

## 5. Evidencia de pruebas (curl)

Peticiones de ejemplo contra el CRUD, ejecutando la app localmente
(`http://localhost:8080`):

**Crear (POST)**
```bash
curl -X POST http://localhost:8080/recetas-favoritas \
  -H "Content-Type: application/json" \
  -d '{"mealId":"52772","nombre":"Chicken Teriyaki","categoria":"Chicken","area":"Japanese","imagenUrl":"https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg"}'
```
Respuesta esperada — `201 Created` con el objeto guardado, incluyendo el `id` autogenerado:
```json
{
  "id": 1,
  "mealId": "52772",
  "nombre": "Chicken Teriyaki",
  "categoria": "Chicken",
  "area": "Japanese",
  "imagenUrl": "https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg"
}
```

**Listar (GET)**
```bash
curl http://localhost:8080/recetas-favoritas
```
Respuesta esperada — `200 OK` con un arreglo de recetas favoritas.

**Obtener una (GET)**
```bash
curl http://localhost:8080/recetas-favoritas/1
```
Respuesta esperada — `200 OK` con la receta de `id=1`.

**Actualizar (PUT)**
```bash
curl -X PUT http://localhost:8080/recetas-favoritas/1 \
  -H "Content-Type: application/json" \
  -d '{"mealId":"52772","nombre":"Chicken Teriyaki (actualizado)","categoria":"Chicken","area":"Japanese","imagenUrl":"https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg"}'
```
Respuesta esperada — `200 OK` con el objeto actualizado (mismo `id`, `nombre` modificado).

**Borrar (DELETE)**
```bash
curl -X DELETE http://localhost:8080/recetas-favoritas/1
```
Respuesta esperada — `200 OK` sin contenido, y la receta ya no aparece en un GET posterior a `/recetas-favoritas`.

## 6. Estructura del proyecto

```
08-week/
├── RecetaFavorita.java             (entity)
├── RecetaFavoritaRepository.java   (repository)
├── RecetaFavoritaService.java      (uso del CRUD desde el service)
├── RecetaFavoritaController.java   (endpoints REST)
└── README.md                       (esta explicación + evidencia de pruebas)
```
