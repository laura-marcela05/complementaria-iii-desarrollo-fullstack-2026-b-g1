# Semana 4 · Componente que consume datos (Angular)

Lista de usuarios traída desde una API pública, con un componente
reutilizable y manejo de estado de carga y error.

## Cómo montarlo

1. Crear el proyecto (necesitas Node.js instalado):

```
npm install -g @angular/cli
ng new usuarios-app --style=css --routing=false
cd usuarios-app
```

2. Reemplazar los archivos generados por los de esta carpeta:

| Archivo de esta carpeta | Dónde va en el proyecto |
|---|---|
| `src/styles.css` | `src/styles.css` |
| `src/app/app.component.ts` | `src/app/app.component.ts` |
| `src/app/app.config.ts` | `src/app/app.config.ts` |
| `src/app/usuarios-lista.component.ts` | `src/app/` (archivo nuevo) |
| `src/app/usuario-tarjeta.component.ts` | `src/app/` (archivo nuevo) |

3. Borrar el `app.component.html` que genera el CLI, porque aquí la
   plantilla va escrita dentro del `.ts`.

4. Levantar la app:

```
ng serve
```

Y abrir `http://localhost:4200`.

## Cómo está organizado

- **`usuario-tarjeta.component.ts`** es el componente reutilizable. Recibe
  nombre, correo y ciudad por `@Input()` y solo se encarga de mostrarlos.
  No sabe de dónde salieron esos datos.
- **`usuarios-lista.component.ts`** es el que tiene el estado (`usuarios`,
  `cargando`, `error`), hace la petición con `HttpClient` y decide qué
  mostrar. Por cada usuario crea una tarjeta.
- **`app.component.ts`** arma la página y coloca la lista adentro.

El botón *Probar el error* apunta a una dirección inventada, así que la
petición falla de verdad y se puede ver el estado de error funcionando.

## Entrega

Copiar el proyecto dentro de `04-week/` del fork de la clase y subir:

```
git add .
git commit -m "Entrega semana 04"
git push
```

`node_modules` no se sube: el `.gitignore` que crea el CLI ya lo excluye.
