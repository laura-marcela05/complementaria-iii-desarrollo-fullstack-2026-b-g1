package com.corhuila.recetasfavoritas.controller;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import com.corhuila.recetasfavoritas.service.RecetaFavoritaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas-favoritas")
public class RecetaFavoritaController {

  private final RecetaFavoritaService service;

  public RecetaFavoritaController(RecetaFavoritaService service) {
    this.service = service;
  }

  // GET /api/recetas-favoritas -> listar todas
  @GetMapping
  public List<RecetaFavorita> listar() {
    return service.listar();
  }

  // GET /api/recetas-favoritas/{id} -> obtener una por id (404 si no existe)
  @GetMapping("/{id}")
  public ResponseEntity<RecetaFavorita> uno(@PathVariable Long id) {
    RecetaFavorita receta = service.buscarPorId(id);
    if (receta == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(receta);
  }

  // GET /api/recetas-favoritas/categoria/{categoria} -> filtrar por categoría
  @GetMapping("/categoria/{categoria}")
  public List<RecetaFavorita> porCategoria(@PathVariable String categoria) {
    return service.listarPorCategoria(categoria);
  }

  // POST /api/recetas-favoritas -> crear (201 Created)
  @PostMapping
  public ResponseEntity<RecetaFavorita> crear(@RequestBody RecetaFavorita receta) {
    RecetaFavorita guardada = service.guardar(receta);
    return ResponseEntity.status(201).body(guardada);
  }

  // PUT /api/recetas-favoritas/{id} -> actualizar (404 si no existe)
  @PutMapping("/{id}")
  public ResponseEntity<RecetaFavorita> actualizar(@PathVariable Long id, @RequestBody RecetaFavorita receta) {
    if (service.buscarPorId(id) == null) {
      return ResponseEntity.notFound().build();
    }
    receta.setId(id);
    return ResponseEntity.ok(service.actualizar(receta));
  }

  // DELETE /api/recetas-favoritas/{id} -> borrar (404 si no existe)
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> borrar(@PathVariable Long id) {
    if (service.buscarPorId(id) == null) {
      return ResponseEntity.notFound().build();
    }
    service.eliminar(id);
    return ResponseEntity.noContent().build();
  }
}
