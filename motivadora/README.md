# Nuestro Camino Juntos 💜

Esta es una presentación interactiva en Vue.js que recorre nuestro camino juntos, desde el inicio hasta ahora. Usa botones para navegar entre diapositivas, cada una con una imagen y texto emotivo recordando nuestro amor.

## Cómo Ver la Página

### Desarrollo Local

1. Instala las dependencias: `npm install`
2. Corre el servidor de desarrollo: `npm run dev`
3. Abre tu navegador en `http://localhost:5173` (o el puerto que indique).

### Construir para Producción

1. `npm run build`
2. Los archivos listos estarán en la carpeta `dist/`.

### Subir a GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todo el proyecto (excepto `node_modules/`).
3. En el repo, ve a Settings > Pages.
4. Selecciona "Deploy from a branch", branch `main`, folder `/ (root)`.
5. O usa GitHub Actions para deploy automático de `dist/`.

## Tecnologías Usadas

- **Vue 3**: Para componentes reactivos y navegación de slideshow.
- **Vite**: Build tool rápido.
- **CSS**: Animaciones y estilos morados románticos.
- Sin dependencias extras.

## Personalización

- Edita `src/App.vue` para cambiar textos, imágenes o agregar más diapositivas.
- Las imágenes están en el array `slides`.
- El tono es emotivo, recordando el amor sin ataques.

## Estructura del Proyecto

- `src/App.vue`: Componente principal con el slideshow.
- `src/main.ts`: Punto de entrada.
- `index.html`: HTML base.
- `src/assets/`: Para imágenes locales si las agregas.

¡Espero que esta presentación te haga sentir cuánto te amo! 💜
