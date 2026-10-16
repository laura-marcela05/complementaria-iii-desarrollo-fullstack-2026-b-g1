package com.corhuila.recetasfavoritas.service;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import com.corhuila.recetasfavoritas.repository.RecetaFavoritaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
  public Optional<RecetaFavorita> buscarPorId(Long id) {
    return repo.findById(id);
  }

  // Read: filtra las recetas favoritas por categoría
  public List<RecetaFavorita> listarPorCategoria(String categoria) {
    return repo.findByCategoria(categoria);
  }

  // Update: solo actualiza si la receta ya existe
  public Optional<RecetaFavorita> actualizar(Long id, RecetaFavorita receta) {
    if (!repo.existsById(id)) {
      return Optional.empty();
    }
    receta.setId(id);
    return Optional.of(repo.save(receta));
  }

  // Delete: solo borra si la receta existe; informa al controller si lo hizo
  public boolean eliminar(Long id) {
    if (!repo.existsById(id)) {
      return false;
    }
    repo.deleteById(id);
    return true;
  }
}
