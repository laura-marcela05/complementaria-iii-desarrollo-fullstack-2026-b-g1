# Mockup - Lista de usuarios

## Descripción

La interfaz permitirá cargar una lista de usuarios desde una API. Tendrá un encabezado, un botón para cargar los usuarios y un espacio donde se mostrará la información.

## Diseño de la interfaz

```text
┌─────────────────────────────────────────────┐
│                                             │
│              LISTA DE USUARIOS              │
│       Usuarios obtenidos desde una API      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│              ┌─────────────────┐            │
│              │ Cargar usuarios │            │
│              └─────────────────┘            │
│                                             │
│           Usuarios cargados correctamente   │
│                                             │
│       ┌─────────────────────────────┐       │
│       │ • Leanne Graham             │       │
│       │ • Ervin Howell              │       │
│       │ • Clementine Bauch           │       │
│       │ • Patricia Lebsack           │       │
│       │ • Chelsey Dietrich           │       │
│       └─────────────────────────────┘       │
│                                             │
└─────────────────────────────────────────────┘
```

## Estados de la interfaz

### Cargando

```text
┌─────────────────────────────────┐
│      Cargando usuarios...       │
└─────────────────────────────────┘
```

### Datos cargados

```text
┌─────────────────────────────────┐
│  Usuarios cargados correctamente│
│                                 │
│  • Usuario 1                    │
│  • Usuario 2                    │
│  • Usuario 3                    │
└─────────────────────────────────┘
```

### Error

```text
┌─────────────────────────────────┐
│   Error al cargar los usuarios  │
└─────────────────────────────────┘
```

El diseño busca que la información sea fácil de visualizar y que los estados de carga, datos y error sean claros para el usuario.
