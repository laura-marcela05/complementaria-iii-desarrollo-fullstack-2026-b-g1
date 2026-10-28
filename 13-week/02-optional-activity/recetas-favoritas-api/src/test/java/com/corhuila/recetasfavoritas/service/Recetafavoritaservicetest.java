package com.corhuila.recetasfavoritas.service;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import com.corhuila.recetasfavoritas.repository.RecetaFavoritaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

// Prueba unitaria: aquí se prueba SOLO RecetaFavoritaService.
// El repositorio se reemplaza por uno falso (mock) al que le decimos qué responder,
// así la prueba no necesita la base de datos y corre en milisegundos.
// Nombre de cada prueba: método_situación_resultadoEsperado
@ExtendWith(MockitoExtension.class)
class RecetaFavoritaServiceTest {

  @Mock
  private RecetaFavoritaRepository repo;      // repositorio falso

  @InjectMocks
  private RecetaFavoritaService service;      // el service real, usando el repositorio falso

  // ---------- Camino feliz ----------

  @Test
  void listarPorCategoria_categoriaConRecetas_devuelveEsasRecetas() {
    RecetaFavorita handi = new RecetaFavorita("52795", "Chicken Handi", "Chicken", "Indian", "https://ejemplo.com/handi.jpg");
    when(repo.findByCategoria("Chicken")).thenReturn(List.of(handi));

    List<RecetaFavorita> resultado = service.listarPorCategoria("Chicken");

    assertEquals(1, resultado.size());
    assertEquals("Chicken Handi", resultado.get(0).getNombre());
    verify(repo).findByCategoria("Chicken");
  }

  @Test
  void actualizar_idExistente_asignaElIdYGuarda() {
    RecetaFavorita nueva = new RecetaFavorita("52795", "Chicken Handi", "Chicken", "Indian", "https://ejemplo.com/handi.jpg");
    when(repo.existsById(2L)).thenReturn(true);
    when(repo.save(nueva)).thenReturn(nueva);

    Optional<RecetaFavorita> resultado = service.actualizar(2L, nueva);

    assertTrue(resultado.isPresent());
    assertEquals(2L, resultado.get().getId());   // el service le asigna el id de la URL
    verify(repo).save(nueva);
  }

  @Test
  void eliminar_idExistente_borraYDevuelveTrue() {
    when(repo.existsById(2L)).thenReturn(true);

    boolean borrada = service.eliminar(2L);

    assertTrue(borrada);
    verify(repo).deleteById(2L);
  }

  // ---------- Casos de error / límite ----------

  @Test
  void buscarPorId_idInexistente_devuelveVacio() {
    when(repo.findById(99L)).thenReturn(Optional.empty());

    Optional<RecetaFavorita> resultado = service.buscarPorId(99L);

    assertTrue(resultado.isEmpty());   // el controller lo convierte en 404
  }

  @Test
  void actualizar_idInexistente_devuelveVacioYNoGuarda() {
    when(repo.existsById(99L)).thenReturn(false);

    Optional<RecetaFavorita> resultado = service.actualizar(99L, new RecetaFavorita());

    assertTrue(resultado.isEmpty());
    verify(repo, never()).save(any(RecetaFavorita.class));   // no se guardó nada
  }

  @Test
  void eliminar_idInexistente_devuelveFalseYNoBorra() {
    when(repo.existsById(99L)).thenReturn(false);

    boolean borrada = service.eliminar(99L);

    assertFalse(borrada);
    verify(repo, never()).deleteById(anyLong());   // no se intentó borrar nada
  }
}