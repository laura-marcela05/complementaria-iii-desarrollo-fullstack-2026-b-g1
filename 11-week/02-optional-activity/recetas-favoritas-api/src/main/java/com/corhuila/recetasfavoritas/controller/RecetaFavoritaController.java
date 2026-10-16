package com.corhuila.recetasfavoritas.controller;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import com.corhuila.recetasfavoritas.service.RecetaFavoritaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

  @Operation(summary = "Listar todas las recetas favoritas")
  @ApiResponse(responseCode = "200", description = "Lista de recetas favoritas")
  @GetMapping
  public List<RecetaFavorita> listar() {
    return service.listar();
  }

  @Operation(summary = "Obtener una receta favorita por su id")
  @ApiResponse(responseCode = "200", description = "Receta encontrada")
  @ApiResponse(responseCode = "404", description = "No existe una receta con ese id", content = @Content)
  @GetMapping("/{id}")
  public ResponseEntity<RecetaFavorita> uno(@PathVariable Long id) {
    return service.buscarPorId(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @Operation(summary = "Filtrar recetas favoritas por categoría")
  @ApiResponse(responseCode = "200", description = "Lista de recetas que coinciden con la categoría")
  @GetMapping("/categoria/{categoria}")
  public List<RecetaFavorita> porCategoria(@PathVariable String categoria) {
    return service.listarPorCategoria(categoria);
  }

  @Operation(summary = "Guardar una receta como favorita")
  @ApiResponse(responseCode = "201", description = "Receta creada")
  @PostMapping
  public ResponseEntity<RecetaFavorita> crear(@RequestBody RecetaFavorita receta) {
    RecetaFavorita guardada = service.guardar(receta);
    return ResponseEntity.status(201).body(guardada);
  }

  @Operation(summary = "Actualizar una receta favorita existente")
  @ApiResponse(responseCode = "200", description = "Receta actualizada")
  @ApiResponse(responseCode = "404", description = "No existe una receta con ese id", content = @Content)
  @PutMapping("/{id}")
  public ResponseEntity<RecetaFavorita> actualizar(@PathVariable Long id, @RequestBody RecetaFavorita receta) {
    return service.actualizar(id, receta)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @Operation(summary = "Quitar una receta de favoritos")
  @ApiResponse(responseCode = "204", description = "Receta borrada")
  @ApiResponse(responseCode = "404", description = "No existe una receta con ese id", content = @Content)
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> borrar(@PathVariable Long id) {
    if (service.eliminar(id)) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
