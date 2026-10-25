package com.corhuila.recetasfavoritas.service;

import com.corhuila.recetasfavoritas.repository.UsuarioRepository;
import com.corhuila.recetasfavoritas.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

  private final UsuarioRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(UsuarioRepository usuarioRepository,
                     PasswordEncoder passwordEncoder,
                     JwtService jwtService) {
    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  // Devuelve el token si las credenciales son correctas; vacío si no.
  // No distingue "usuario no existe" de "contraseña incorrecta": así no se le da pistas a un atacante.
  public Optional<String> login(String username, String password) {
    if (username == null || password == null) {
      return Optional.empty();
    }
    return usuarioRepository.findByUsername(username)
        .filter(usuario -> passwordEncoder.matches(password, usuario.getPassword()))
        .map(usuario -> jwtService.generarToken(usuario.getUsername(), usuario.getRol()));
  }
}
