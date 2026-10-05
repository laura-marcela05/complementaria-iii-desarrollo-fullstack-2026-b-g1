# Problema 1 — Fundamentos web

Catálogo de productos construido con HTML5 semántico, CSS3 y JavaScript.

## Descripción

La vista muestra un catálogo de 4 productos (nombre, descripción y precio) organizados
en tarjetas. Un botón permite alternar entre dos estilos visuales de la lista.

## Rol de cada lenguaje

- **HTML** define la estructura y el contenido de la página: qué elementos existen
  (encabezado, lista de productos, botón) y cómo se relacionan jerárquicamente entre
  sí. No decide colores ni comportamiento, solo la organización semántica del contenido.

- **CSS** define la presentación visual: cómo se ven esos elementos (colores,
  espaciado, disposición en fila/columna, tipografía). En este ejercicio, CSS es quien
  decide qué significa visualmente la clase `estilo-alterno`, sin que HTML o JS
  necesiten saberlo.

- **JavaScript** define el comportamiento e interactividad: qué pasa cuando el usuario
  interactúa con la página. Aquí, JS no dibuja ni decide estilos directamente — solo
  escucha el evento `click` del botón y alterna una clase CSS sobre la lista,
  delegando la parte visual al CSS. Esta separación de responsabilidades es una buena
  práctica: cada lenguaje hace solo lo que le corresponde.

## Estructura de archivos

```
case-1/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── img/
    └── js/
        └── script.js
```