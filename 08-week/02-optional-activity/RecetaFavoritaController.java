import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recetas-favoritas")
public class RecetaFavoritaController {

  private final RecetaFavoritaService service;

  public RecetaFavoritaController(RecetaFavoritaService service) {
    this.service = service;
  }

  // GET /recetas-favoritas -> listar todas
  @GetMapping
  public List<RecetaFavorita> listar() {
    return service.listar();
  }

  // GET /recetas-favoritas/{id} -> obtener una por id
  @GetMapping("/{id}")
  public RecetaFavorita uno(@PathVariable Long id) {
    return service.buscarPorId(id);
  }

  // GET /recetas-favoritas/categoria/{categoria} -> filtrar por categoría
  @GetMapping("/categoria/{categoria}")
  public List<RecetaFavorita> porCategoria(@PathVariable String categoria) {
    return service.listarPorCategoria(categoria);
  }

  // POST /recetas-favoritas -> crear
  @PostMapping
  public RecetaFavorita crear(@RequestBody RecetaFavorita receta) {
    return service.guardar(receta);
  }

  // PUT /recetas-favoritas/{id} -> actualizar
  @PutMapping("/{id}")
  public RecetaFavorita actualizar(@PathVariable Long id, @RequestBody RecetaFavorita receta) {
    receta.setId(id);
    return service.actualizar(receta);
  }

  // DELETE /recetas-favoritas/{id} -> borrar
  @DeleteMapping("/{id}")
  public void borrar(@PathVariable Long id) {
    service.eliminar(id);
  }
}
