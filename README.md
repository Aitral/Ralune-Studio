# Ralune Studio

Landing en español a partir de la captura aprobada de Stitch. Vite + HTML, CSS y JavaScript, sin framework. Incluye navegación móvil, selector de disciplinas con teclado, fichas de exploraciones conceptuales y página de agradecimiento. No incluye animaciones ni 3D.

## Desarrollo y compilación

Requiere Node.js 20.19+ o 22.12+ y npm.

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

La compilación se guarda en `dist/`. `vite.config.js` usa rutas relativas para permitir alojamiento en una subcarpeta de GitHub Pages. La página de agradecimiento se compila en `dist/gracias/index.html`. No se ha publicado el sitio.

## Editar contenido y marca

- `index.html`: secciones, textos principales y formulario.
- `src/content.js`: contenido ampliado de disciplinas y fichas de exploraciones.
- `src/styles.css`: variables de marca, tipografía, componentes y responsive.
- `src/contact.js`: configuración del contacto, separada del contenido.
- `public/assets/`: imágenes originales de Stitch en dos tamaños, más su manifiesto de procedencia.
- `referencia-stitch/`: ZIP extraído intacto; no editar los originales.
- `PRODUCT.md`, `DESIGN.md` y `.impeccable/surfaces/landing.md`: contexto del producto y decisiones de diseño.

Las tres tarjetas son exploraciones conceptuales. No representan encargos reales, clientes ni resultados. La marca textual es provisional hasta recibir el logo original.

## FormSubmit: integración local

El formulario está bloqueado por defecto y nunca simula un envío exitoso. Configura `src/contact.js` con el correo receptor confirmado o el identificador de endpoint de FormSubmit:

```js
export const contact = {
  endpoint: '', // Sustituir por el correo o identificador confirmado.
  publicSiteUrl: '', // URL HTTPS absoluta del sitio; incluir su subcarpeta si existe.
  subject: 'Nuevo mensaje desde Ralune Studio',
};
```

Con un endpoint válido, se habilita el envío HTML nativo mediante POST a FormSubmit, con campos `name`, `email`, `message`, `_subject` y `_template=table`. No se desactiva CAPTCHA. Cuando se configure una URL pública HTTPS, `_next` apuntará a su ruta `gracias/`. Sin URL pública se utilizará el destino predeterminado del servicio.

Consulta la [documentación oficial de FormSubmit](https://formsubmit.co/) antes de activar. Los mensajes no se guardan en localStorage, analítica ni consola. Sin JavaScript el envío permanece deshabilitado.

## Activación del correo y prueba real de entrega

Estas acciones están pendientes del propietario y son distintas de las verificaciones locales:

1. Proporcionar el correo o endpoint y la URL pública.
2. Autorizar el primer envío real y confirmar la activación desde el correo receptor.
3. Autorizar una prueba de entrega, comprobar la bandeja y revisar spam.

La página de agradecimiento no certifica que el correo llegó a la bandeja. Ninguna prueba de esta implementación ha enviado mensajes externos.

## Verificación local

```sh
npm run test:ui
```

Con el servidor local activo, utiliza Microsoft Edge instalado en modo headless. Verifica 360, 390, 768, 1440 y 1600 px, imágenes, desbordamiento, pestañas por teclado, menú, diálogos y retorno de foco, formulario bloqueado, anclas, página de agradecimiento y lectura sin JavaScript. Bloquea la red hacia FormSubmit. Capturas y resultados quedan en `.impeccable/review/` (ignorados por Git).

No se midieron Core Web Vitals ni se prometen puntuaciones de rendimiento. La emulación móvil no sustituye una prueba en teléfono físico. La revisión y los cambios de calidad se registran en `REVISION.md`.

## Pendiente antes de publicar

Correo/endpoint y activación de FormSubmit; URL pública; logo original y favicon; textos y rutas legales; confirmar derechos de publicación de las imágenes exportadas. Los enlaces legales se añadirán cuando existan documentos reales. Los metadatos canonical y URL social quedan pendientes del dominio. No se muestran teléfonos, correos públicos, redes ni disponibilidad no confirmada.
