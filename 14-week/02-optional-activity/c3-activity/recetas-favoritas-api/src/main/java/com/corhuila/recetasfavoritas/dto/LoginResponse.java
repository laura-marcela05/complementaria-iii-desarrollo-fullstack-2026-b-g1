package com.corhuila.recetasfavoritas.dto;

// Lo que la API responde si el login es correcto
public record LoginResponse(String token, String tipo) {
}
