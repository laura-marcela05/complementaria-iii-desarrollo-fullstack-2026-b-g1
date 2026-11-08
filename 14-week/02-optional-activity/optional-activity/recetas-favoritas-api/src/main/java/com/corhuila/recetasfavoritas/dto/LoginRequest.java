package com.corhuila.recetasfavoritas.dto;

// Lo que el cliente envía en POST /api/auth/login
public record LoginRequest(String username, String password) {
}
