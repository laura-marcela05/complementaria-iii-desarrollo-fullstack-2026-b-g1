package com.corhuila.recetasfavoritas.controller;

import com.corhuila.recetasfavoritas.dto.LoginRequest;
import com.corhuila.recetasfavoritas.dto.LoginResponse;
import com.corhuila.recetasfavoritas.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// CORS: permite que el frontend (React en localhost:5173) llame al login desde el navegador
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @Operation(summary = "Iniciar sesión y recibir un token JWT")
  @ApiResponse(responseCode = "200", description = "Credenciales correctas: devuelve el token")
  @ApiResponse(responseCode = "401", description = "Usuario o contraseña incorrectos", content = @Content)
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    return authService.login(request.username(), request.password())
        .map(token -> ResponseEntity.ok(new LoginResponse(token, "Bearer")))
        .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }
}