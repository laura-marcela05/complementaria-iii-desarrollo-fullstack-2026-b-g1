package com.corhuila.recetasfavoritas.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, JwtService jwtService) throws Exception {
    http
        // CORS dentro de Spring Security: responde el preflight (OPTIONS) ANTES de exigir el token.
        // Lee los @CrossOrigin de los controladores. Sin esto, el preflight recibiría 401.
        .cors(Customizer.withDefaults())

        // La API usa token, no cookies de sesión, así que no aplica la protección CSRF
        .csrf(AbstractHttpConfigurer::disable)

        // Stateless: el servidor no guarda sesión en memoria, valida el token en cada petición
        .sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(rutas -> rutas
            // Públicas: el login, la documentación y /error
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
            // /error debe ser pública: Spring redirige ahí los 403 y, si estuviera protegida,
            // el 403 se convertiría en 401
            .requestMatchers("/error").permitAll()
            // Autorización por rol: borrar solo lo puede hacer un ADMIN
            .requestMatchers(HttpMethod.DELETE, "/api/recetas-favoritas/**").hasRole("ADMIN")
            // Todo lo demás exige estar autenticado (token válido)
            .anyRequest().authenticated())

        // Sin token (o con token inválido) responde 401. Sin esta línea, Spring respondería 403.
        .exceptionHandling(errores -> errores
            .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))

        // Nuestro filtro revisa el token antes del filtro de login por defecto
        .addFilterBefore(new JwtAuthFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  // BCrypt convierte la contraseña en un hash. Nunca se guarda en texto plano.
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}