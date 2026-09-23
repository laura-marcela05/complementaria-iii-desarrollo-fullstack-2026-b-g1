import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecetaFavoritaRepository extends JpaRepository<RecetaFavorita, Long> {

  // Spring Data interpreta el nombre del método y genera el SQL automáticamente
  // (equivale a SELECT * FROM receta_favorita WHERE categoria = ?)
  List<RecetaFavorita> findByCategoria(String categoria);
}
