package com.corhuila.recetasfavoritas.repository;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecetaFavoritaRepository extends JpaRepository<RecetaFavorita, Long> {

  // Spring Data interpreta el nombre del método y genera el SQL automáticamente
  List<RecetaFavorita> findByCategoria(String categoria);
}
