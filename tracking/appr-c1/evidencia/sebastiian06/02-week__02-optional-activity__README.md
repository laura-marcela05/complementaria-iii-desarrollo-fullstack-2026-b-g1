# Desarrollo de la actividad

## Características de esta implementación:

### ✅ HTML5 (Estructura)
- Etiquetas semánticas: header, nav, main, section, footer
- Estructura clara y organizada
- Accesibilidad básica

### ✅ CSS3 (Apariencia)
- Selectores de clase, ID y elementos
- Modelo de caja (margin, padding, border)
- Flexbox para navegación
- Grid para lista de productos
- Gradientes y transiciones
- Diseño responsive
- Especificidad controlada

### ✅ JavaScript (Comportamiento)
- Manipulación del DOM
- Event listeners (addEventListener)
- Funciones con lógica de negocio
- Simulación de API (setTimeout)
- Interacción con usuario (alert, feedback visual)
- Atajos de teclado (accesibilidad)

### ✅ SPA vs MPA

**Es una SPA (Single Page Application) porque:**
- No recarga la página
- Actualiza contenido dinámicamente
- Comportamiento con JavaScript puro
- Interfaz fluida y rápida

## Diferencias clave:

### ¿Por qué es una SPA?
```javascript
// En una SPA, el contenido se actualiza sin recargar
function cargarProductos() {
    // Solo actualiza el DOM, no recarga la página
    lista.innerHTML = '';
    // ... agrega nuevos elementos
}
```

### ¿Cómo sería una MPA?
En una MPA tradicional, cada botón llevaría a una nueva URL:

```html
<!-- MPA: cada acción es una página nueva -->
<a href="/productos">Ver Productos</a>  <!-- Recarga -->
<a href="/contacto">Contacto</a>        <!-- Recarga -->
```

------

## Instrucciones de uso:

- Abrir index.html en el navegador
- Probar la funcionalidad:
- Click en "Cargar Productos" → muestra la lista
- Click en "Limpiar Lista" → vacía la lista
- Click en cualquier producto → muestra detalles
- Atajos de teclado: Ctrl+C para cargar, Ctrl+L para limpiar
