import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecetaFavoritaService {

  private final RecetaFavoritaRepository repo;

  public RecetaFavoritaService(RecetaFavoritaRepository repo) {
    this.repo = repo;
  }

  // Create: guarda una receta nueva como favorita
  public RecetaFavorita guardar(RecetaFavorita receta) {
    return repo.save(receta);
  }

  // Read: lista todas las recetas favoritas
  public List<RecetaFavorita> listar() {
    return repo.findAll();
  }

  // Read: busca una receta favorita por su id
  public RecetaFavorita buscarPorId(Long id) {
    return repo.findById(id).orElse(null);
  }

  // Read: filtra las recetas favoritas por categoría
  public List<RecetaFavorita> listarPorCategoria(String categoria) {
    return repo.findByCategoria(categoria);
  }

  // Update: guarda una receta ya existente (save actualiza si el id ya existe)
  public RecetaFavorita actualizar(RecetaFavorita receta) {
    return repo.save(receta);
  }

  // Delete: quita una receta de favoritos
  public void eliminar(Long id) {
    repo.deleteById(id);
  }
}
