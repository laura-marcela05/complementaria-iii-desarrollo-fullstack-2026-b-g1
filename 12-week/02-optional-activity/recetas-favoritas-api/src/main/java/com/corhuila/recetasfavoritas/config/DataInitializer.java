package com.corhuila.recetasfavoritas.config;

import com.corhuila.recetasfavoritas.model.RecetaFavorita;
import com.corhuila.recetasfavoritas.model.Usuario;
import com.corhuila.recetasfavoritas.repository.RecetaFavoritaRepository;
import com.corhuila.recetasfavoritas.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Como H2 está en memoria y se vacía en cada arranque, aquí se crean los usuarios de prueba
// y dos recetas para que el frontend tenga datos que mostrar apenas inicie sesión.
// Solo para la actividad: en un proyecto real no se crean datos ni contraseñas fijas en el código.
@Component
public class DataInitializer implements CommandLineRunner {

  private final UsuarioRepository usuarioRepository;
  private final RecetaFavoritaRepository recetaRepository;
  private final PasswordEncoder passwordEncoder;

  public DataInitializer(UsuarioRepository usuarioRepository,
                         RecetaFavoritaRepository recetaRepository,
                         PasswordEncoder passwordEncoder) {
    this.usuarioRepository = usuarioRepository;
    this.recetaRepository = recetaRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) {
    if (usuarioRepository.count() == 0) {
      usuarioRepository.save(new Usuario("admin", passwordEncoder.encode("admin123"), "ADMIN"));
      usuarioRepository.save(new Usuario("user", passwordEncoder.encode("user123"), "USER"));
    }
    if (recetaRepository.count() == 0) {
      recetaRepository.save(new RecetaFavorita("52771", "Spicy Arrabiata Penne", "Vegetarian", "Italian",
          "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"));
      recetaRepository.save(new RecetaFavorita("52795", "Chicken Handi", "Chicken", "Indian",
          "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg"));
    }
  }
}