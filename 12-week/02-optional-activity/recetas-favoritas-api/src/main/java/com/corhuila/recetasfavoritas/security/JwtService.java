package com.corhuila.recetasfavoritas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

  private final SecretKey key;
  private final long expirationMs;

  public JwtService(@Value("${app.jwt.secret}") String secret,
                    @Value("${app.jwt.expiration-ms}") long expirationMs) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expirationMs = expirationMs;
  }

  // Crea un token firmado con la identidad (subject), el rol y una fecha de caducidad.
  // El token NO lleva la contraseña.
  public String generarToken(String username, String rol) {
    Date ahora = new Date();
    return Jwts.builder()
        .subject(username)
        .claim("rol", rol)
        .issuedAt(ahora)
        .expiration(new Date(ahora.getTime() + expirationMs))
        .signWith(key, Jwts.SIG.HS256)
        .compact();
  }

  // Valida la firma y la caducidad, y devuelve el contenido (claims) del token.
  // Si el token es falso, fue alterado o ya venció, lanza una excepción (JwtException).
  public Claims leerClaims(String token) {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }
}
