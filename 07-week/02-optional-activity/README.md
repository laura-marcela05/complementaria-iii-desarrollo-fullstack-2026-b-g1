# Actividad Semana 07 — Entity y Repository (JPA)

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

## 4. Estructura del proyecto

```
07-week/
├── RecetaFavorita.java           (entity)
├── RecetaFavoritaRepository.java (repository)
├── RecetaFavoritaService.java    (uso del CRUD desde el service)
└── README.md                     (esta explicación)
```
