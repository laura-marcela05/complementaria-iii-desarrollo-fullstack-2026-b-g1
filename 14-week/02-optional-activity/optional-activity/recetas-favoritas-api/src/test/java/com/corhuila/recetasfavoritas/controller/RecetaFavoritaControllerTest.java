package com.corhuila.recetasfavoritas.controller;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Prueba de INTEGRACIÓN: no hay nada falso. @SpringBootTest levanta la aplicación completa
// (seguridad JWT + controller + service + repository + H2) y MockMvc hace las peticiones HTTP
// como si fuera Postman, pero sin abrir el puerto 8080.
// @Transactional deshace al terminar cada prueba lo que haya guardado, para que no se afecten entre sí.
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class RecetaFavoritaControllerTest {

  private static final String URL = "/api/recetas-favoritas";

  @Autowired
  private MockMvc mockMvc;

  private String tokenAdmin;
  private String tokenUser;

  // Antes de cada prueba se hace un login de verdad y se guarda el token que devuelve la API
  @BeforeEach
  void iniciarSesion() throws Exception {
    tokenAdmin = login("admin", "admin123");
    tokenUser = login("user", "user123");
  }

  private String login(String usuario, String clave) throws Exception {
    String respuesta = mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"" + usuario + "\",\"password\":\"" + clave + "\"}"))
        .andExpect(status().isOk())
        .andReturn().getResponse().getContentAsString();
    return JsonPath.read(respuesta, "$.token");
  }

  // ---------- Camino feliz ----------

  @Test
  void listar_conToken_responde200ConLasDosRecetasIniciales() throws Exception {
    mockMvc.perform(get(URL).header("Authorization", "Bearer " + tokenUser))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].nombre").value("Spicy Arrabiata Penne"))
        .andExpect(jsonPath("$[1].nombre").value("Chicken Handi"));
  }

  @Test
  void crear_conToken_responde201YDevuelveLaRecetaConId() throws Exception {
    String cuerpo = """
        {"mealId":"52772","nombre":"Teriyaki Chicken Casserole","categoria":"Chicken",
         "area":"Japanese","imagenUrl":"https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"}
        """;

    mockMvc.perform(post(URL)
            .header("Authorization", "Bearer " + tokenUser)
            .contentType(MediaType.APPLICATION_JSON)
            .content(cuerpo))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.nombre").value("Teriyaki Chicken Casserole"));
  }

  // ---------- Casos de error ----------

  @Test
  void listar_sinToken_responde401() throws Exception {
    mockMvc.perform(get(URL))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void listar_conTokenFalso_responde401() throws Exception {
    mockMvc.perform(get(URL).header("Authorization", "Bearer esto.no.es-un-token"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void buscar_idInexistente_responde404() throws Exception {
    mockMvc.perform(get(URL + "/9999").header("Authorization", "Bearer " + tokenUser))
        .andExpect(status().isNotFound());
  }

  @Test
  void borrar_comoUsuarioNormal_responde403() throws Exception {
    // Borrar solo lo puede hacer un ADMIN (regla de SecurityConfig)
    mockMvc.perform(delete(URL + "/1").header("Authorization", "Bearer " + tokenUser))
        .andExpect(status().isForbidden());
  }

  @Test
  void borrar_comoAdminConIdInexistente_responde404() throws Exception {
    mockMvc.perform(delete(URL + "/9999").header("Authorization", "Bearer " + tokenAdmin))
        .andExpect(status().isNotFound());
  }
}