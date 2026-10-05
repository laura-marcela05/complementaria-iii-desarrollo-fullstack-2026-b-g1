# Actividad Semana 06 — Arquitectura en Capas de una API

**Caso elegido:** Catálogo de Videojuegos (GameStore API)

La API permite gestionar un catálogo de videojuegos (título, género, plataforma, precio,
stock), siguiendo la arquitectura en capas: Controller → Service → Repository → Entity.

---

## 1. Diagrama de capas

![Diagrama de capas de la API](diagrama-capas.png)

La petición entra por el Controller, baja capa por capa hasta la base de datos, y la
respuesta vuelve por el mismo camino en sentido contrario.

---

## 2. Responsabilidad de cada capa

| Capa | Clase | Responsabilidad |
|------|-------|------------------|
| Controller | `VideojuegoController` | Recibe la petición HTTP, valida la entrada y devuelve la respuesta en JSON. No accede a la base de datos. |
| Service | `VideojuegoService` | Contiene la lógica de negocio (por ejemplo, validar que el precio y el stock sean correctos). |
| Repository | `VideojuegoRepository` | Lee y escribe en la base de datos (consultas CRUD). |
| Entity | `Videojuego` | Modela la tabla `videojuegos`: cada instancia es una fila (un videojuego). |

El Controller nunca habla directo con el Repository; siempre pasa por el Service.

---

## 3. Endpoint de ejemplo

**`GET /api/videojuegos/{id}`** — obtiene un videojuego por su ID.

1. **Controller** recibe el `id` de la URL y llama al Service.
2. **Service** verifica que el videojuego exista (lógica de negocio) y llama al Repository.
3. **Repository** consulta la tabla `videojuegos` en la base de datos.
4. **Entity** representa la fila encontrada, que vuelve como respuesta JSON al cliente.

Pasa por las cuatro capas porque cada una tiene una única responsabilidad: el Controller no
sabe consultar la base de datos, y el Repository no sabe manejar peticiones HTTP.

