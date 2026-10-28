package com.corhuila.recetasfavoritas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Usuario {

  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  // Nunca se guarda la contraseña en texto plano: aquí va el hash (BCrypt)
  @Column(nullable = false)
  private String password;

  // "ADMIN" o "USER"
  @Column(nullable = false)
  private String rol;

  public Usuario() {
  }

  public Usuario(String username, String password, String rol) {
    this.username = username;
    this.password = password;
    this.rol = rol;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRol() {
    return rol;
  }

  public void setRol(String rol) {
    this.rol = rol;
  }
}
