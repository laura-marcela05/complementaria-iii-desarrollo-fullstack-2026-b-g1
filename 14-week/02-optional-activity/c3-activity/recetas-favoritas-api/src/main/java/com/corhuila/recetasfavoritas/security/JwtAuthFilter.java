package com.corhuila.recetasfavoritas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// Corre una vez por cada petición, ANTES de llegar al controller.
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtAuthFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {

    // 1) El token viaja en la cabecera:  Authorization: Bearer <token>
    String cabecera = request.getHeader("Authorization");

    if (cabecera != null && cabecera.startsWith("Bearer ")) {
      String token = cabecera.substring(7);
      try {
        // 2) Se valida la firma y la caducidad
        Claims claims = jwtService.leerClaims(token);
        String username = claims.getSubject();
        String rol = claims.get("rol", String.class);

        // 3) Si es válido, la petición queda "autenticada" con su rol
        UsernamePasswordAuthenticationToken autenticacion = new UsernamePasswordAuthenticationToken(
            username, null, List.of(new SimpleGrantedAuthority("ROLE_" + rol)));
        SecurityContextHolder.getContext().setAuthentication(autenticacion);
      } catch (JwtException | IllegalArgumentException e) {
        // Token falso, alterado, vencido o vacío: no se autentica la petición.
        // Más adelante Spring Security responderá 401.
        SecurityContextHolder.clearContext();
      }
    }

    // Sin token, la petición sigue sin autenticar y Spring Security decide si la deja pasar.
    filterChain.doFilter(request, response);
  }
}
