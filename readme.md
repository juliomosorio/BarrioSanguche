# Barrio Sánguche — Demo

Landing page de demostración para negocios de comida rápida. Pensada como pieza de portafolio: se muestra a dueños de locales sin página web para ofrecerles un sitio a medida.

## Estructura del proyecto

```
barrio-sanguche/
├── index.html      # Contenido y estructura de la página
├── styles.css       # Todos los estilos visuales
├── script.js         # Interactividad (menú móvil)
└── README.md         # Este archivo
```

Los tres archivos deben estar en la misma carpeta — `index.html` los enlaza por ruta relativa (`href="styles.css"`, `src="script.js"`).

## Ver la página en local

No necesitas instalar nada: abre `index.html` directamente en el navegador (doble clic, o clic derecho → "Abrir con").

Si prefieres verla como se vería servida de verdad (recomendado antes de mostrarla a un cliente), y tienes Node instalado:

```
npx serve .
```

Esto levanta un servidor local y te da una URL tipo `http://localhost:3000`.

## Qué personalizar para cada cliente nuevo

Todo el contenido específico del negocio está en `index.html`. Lo que normalmente cambia de un cliente a otro:

- **Nombre y logo** — `<div class="logo">` en la barra de navegación.
- **Frase del hero** — dentro de `<h1>`, los `<span class="out">` y `<span class="fill">`.
- **Menú / productos** — cada bloque `<div class="menu-item">` dentro de `<div class="menu-grid">`. Puedes agregar o quitar tarjetas libremente, el CSS se ajusta solo.
- **Fotos del menú** — el atributo `src` de cada `<img class="menu-img">`. Este demo usa fotos de stock de Unsplash (hotlink directo); para un cliente real, lo ideal es reemplazarlas por fotos propias del local, guardadas en una carpeta `/img` del proyecto.
- **Reseñas** — sección `.reviews`.
- **Dirección, horario, contacto** — sección `#ubicacion`.
- **Número de WhatsApp** — busca `href="#"` en los botones "Pedir por WhatsApp" y reemplázalo por un link tipo `https://wa.me/56912345678`.
- **Colores** — todos definidos como variables al inicio de `styles.css` (bloque `:root`). Cambiando esos 5-6 valores, el sitio completo cambia de paleta.

## Funciones nuevas

- **Favicon** (`favicon.svg`): un monograma simple con los colores de marca. Para otro cliente, cambia la letra dentro del `<text>` y los colores de fondo/relleno.
- **Carrito de pedido → WhatsApp**: cada producto tiene un contador (+/−). Al agregar algo, aparece una barra flotante con el total; al tocar "Enviar pedido", se abre WhatsApp con el mensaje ya armado (cantidades, nombres y total). Todo pasa en el navegador, sin backend ni base de datos.
  - **Importante**: cambia el número de WhatsApp en `script.js`, en la constante `WHATSAPP_NUMBER` al inicio del archivo, por el número real del negocio.
- **Mapa interactivo**: un iframe de Google Maps embebido en la sección de ubicación (no requiere API key). Para otro cliente, reemplaza la dirección en la URL del `src` del iframe (sección `#ubicacion` en `index.html`) por la dirección real. El filtro CSS que lo oscurece está en `.map-wrap iframe` dentro de `styles.css` — si prefieres el mapa a color normal, borra esa línea de `filter`.
- **Botón "Compartir con un amigo"**: usa la función nativa de compartir del celular (la misma que usan Instagram o WhatsApp); en computadores donde no existe, copia el link al portapapeles. No requiere configuración.
- **Estado "Abierto ahora / Cerrado ahora"**: pastilla junto al eyebrow del hero que calcula en vivo, con la hora del visitante, si el local está abierto. El horario (`OPEN_HOUR`, `CLOSE_HOUR`, `CLOSED_DAY`) se define al inicio de `script.js`, junto a `WHATSAPP_NUMBER` — cámbialo por el horario real del negocio.
- **Barra de stats**: franja con números grandes (años, pedidos, tiempo de entrega, calificación) justo después del hero. Es contenido 100% editable en `index.html`, sección `.stats` — pensada para transmitir confianza de un vistazo.
- **Preguntas frecuentes**: sección con acordeones nativos (`<details>/<summary>`, sin JS) para resolver dudas de despacho, pago, opciones y reservas antes de que el cliente escriba por WhatsApp.
- **Badge "Más pedido"**: etiqueta destacada sobre la foto de un producto para dirigir la atención al ítem estrella. Se agrega poniendo `<span class="badge-best">Más pedido</span>` dentro del `.menu-img-wrap` del producto que quieras destacar.
- **Animaciones al hacer scroll**: las tarjetas de menú, reseñas, ingredientes, stats y FAQ aparecen con un fade + slide suave al entrar en pantalla (vía `IntersectionObserver` en `script.js`). Respeta `prefers-reduced-motion`.

## Elementos de diseño a tener en cuenta

- El **sello circular giratorio** (arriba a la derecha, solo en escritorio) es el elemento de marca distintivo — para otro rubro, se puede reemplazar el texto del círculo y el ícono central por algo propio de ese negocio.
- Las fotos del menú llevan un tratamiento de **dúotono + semitono** (efecto flyer serigrafiado) vía CSS, no son fotos editadas — así que cualquier foto que pongas va a heredar automáticamente ese estilo.
- El diseño es **mobile-first**: la barra de "Pedir por WhatsApp" fija abajo solo aparece en celular, que es donde de verdad conviertes pedidos.

## Publicar el sitio (resumen)

1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com), inicia sesión con GitHub → "Add New" → "Project" → importa el repositorio.
3. Deploy. Vercel lo detecta como sitio estático, no requiere configuración de build.
4. Cada `git push` a `main` vuelve a publicar el sitio automáticamente.

(Detalle paso a paso completo: ver la conversación donde se armó este proyecto, o pídele a Claude que te lo repita.)

## Nota sobre las imágenes

Las fotos actuales apuntan directo a Unsplash (`images.unsplash.com/...`). Funciona bien para un demo, pero para producción es más seguro descargar las imágenes y guardarlas dentro del proyecto (por ejemplo en `/img`), para no depender de que ese link externo siga funcionando.