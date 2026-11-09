package com.corhuila.recetasfavoritas.repository;

import com.corhuila.recetasfavoritas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  // Consulta por nombre de método: SELECT * FROM usuario WHERE username = ?
  Optional<Usuario> findByUsername(String username);
}
