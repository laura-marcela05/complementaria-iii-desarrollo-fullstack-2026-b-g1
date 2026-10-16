package com.corhuila.recetasfavoritas.config;

import com.corhuila.recetasfavoritas.model.Usuario;
import com.corhuila.recetasfavoritas.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Como H2 está en memoria y se vacía en cada arranque, aquí se crean dos usuarios de prueba.
// Solo para la actividad: en un proyecto real los usuarios no se crean con contraseñas fijas en el código.
@Component
public class DataInitializer implements CommandLineRunner {

  private final UsuarioRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;

  public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) {
    if (usuarioRepository.count() == 0) {
      usuarioRepository.save(new Usuario("admin", passwordEncoder.encode("admin123"), "ADMIN"));
      usuarioRepository.save(new Usuario("user", passwordEncoder.encode("user123"), "USER"));
    }
  }
}