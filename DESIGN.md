---
name: Ralune Studio
description: El umbral de las ideas — diseño editorial, humano y tecnológico.
colors:
  emerald: "#23c16b"
  forest: "#1f5a45"
  sage: "#9ccfbb"
  cream: "#f3f0e8"
  sand: "#dccfb8"
  stone: "#b7b8b0"
  ink: "#1b1f1e"
  ivory: "#ede6d9"
  muted: "#5c655f"
  surface: "#eeece4"
  line: "#d6d6cc"
  forest-hover: "#174534"
  forest-active: "#133c2d"
  outline: "#a5b9a9"
  selected-outline: "#799b89"
  field: "#e9e4da"
  field-outline: "#b9b9ac"
  disabled-forest: "#456955"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(48px, 6.4vw, 92px)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 400
    letterSpacing: "-.025em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: ".12em"
rounded:
  field: "12px"
  inset: "16px"
  mobile-surface: "20px"
  surface: "24px"
  mobile-nav: "28px"
  capsule: "100px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  field: "16px"
  inset: "20px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section-mobile: "64px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.capsule}"
    padding: "14px 28px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.forest-hover}"
    textColor: "{colors.ivory}"
  button-primary-active:
    backgroundColor: "{colors.forest-active}"
    textColor: "{colors.ivory}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.capsule}"
    padding: "14px 28px"
  button-disabled:
    backgroundColor: "{colors.disabled-forest}"
    textColor: "{colors.ivory}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "{spacing.field}"
  tag:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.forest}"
    rounded: "{rounded.capsule}"
    padding: "6px 14px"
  nav:
    textColor: "{colors.muted}"
    rounded: "{rounded.capsule}"
    padding: "16px 32px"
    width: "1152px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "22px"
  hero-capsule:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.capsule}"
    padding: ".13em .34em .2em"
---

# Design System: Ralune Studio

## Overview

**Creative North Star: "El umbral de las ideas"**

«El umbral de las ideas» une una voz editorial y humana con precisión digital: títulos de Fraunces, lectura de Inter, crema mineral y bosque profundo. El sistema conserva la identidad y la composición aprobadas en Stitch; no plantea un nuevo mundo visual.

El aire entre bloques permite que tipografía, arquitectura e imágenes conduzcan la lectura. La profundidad se concentra en vidrio moderado y dos sombras ambientales, mientras tarjetas y campos se distinguen por tono y borde. La respuesta de interacción es inmediata y estática: añadir animaciones o 3D requiere consulta previa al propietario.

**Key Characteristics:**

- Jerarquía editorial con Fraunces e Inter locales.
- Crema y bosque como base; esmeralda como detalle.
- Cápsulas para acciones y esquinas suaves en contenedores.
- Vidrio legible con alternativa opaca.
- Teclado, foco visible y contenido independiente del movimiento.

Este documento captura la implementación local de `src/styles.css`, `index.html` y `src/main.js`. La estrategia de la landing vive en [.impeccable/surfaces/landing.md](.impeccable/surfaces/landing.md); el contexto del producto, en [PRODUCT.md](PRODUCT.md). La autoridad visual es [la captura original de Stitch](referencia-stitch/stitch_custom_design_system/ralune_studio_landing_escritorio_tema_claro/screen.png). Las capturas locales de revisión son [desktop](.impeccable/review/desktop.png) y [mobile](.impeccable/review/mobile.png).

## Colors

La paleta combina verdes orgánicos con neutros minerales cálidos. El frontmatter contiene los valores normativos extraídos; no se implementa un tema oscuro completo.

### Primary

- **Bosque** (`forest`): botones, cápsula, títulos de panel y sección del estudio. `forest-hover` y `forest-active` oscurecen acciones sin desplazarlas.
- **Esmeralda** (`emerald`): pequeños puntos de identidad y señales decorativas.

### Secondary

- **Salvia** (`sage`): etiquetas, numeración y foco sobre bosque.

### Neutral

- **Crema** (`cream`): fondo de página, etiqueta de foco, diálogo y capas de vidrio.
- **Marfil** (`ivory`): texto sobre bosque.
- **Tinta** (`ink`): lectura principal.
- **Verde gris** (`muted`): lectura secundaria y placeholders.
- **Superficie mineral** (`surface`): tarjetas, detalle de disciplina, contacto y footer.
- **Línea mineral** (`line`): bordes y separadores.
- **Arena** (`sand`): token de marca disponible; los campos implementados usan `field`, una superficie derivada. No sustituirlos silenciosamente.
- **Piedra** (`stone`): base del borde translúcido de navegación.
- **Contorno vegetal** (`outline`) y **Contorno seleccionado** (`selected-outline`): acción secundaria y pestaña seleccionada.
- **Campo cálido** (`field`) y **Contorno de campo** (`field-outline`): formulario.
- **Bosque atenuado** (`disabled-forest`): envío deshabilitado.

**The Umbral Rule.** Conservar la identidad y la autoridad visual de Stitch; resolver defectos concretos sin sustituir el mundo aprobado.

**The Lectura Rule.** Bosque y tinta sostienen la lectura. Esmeralda y piedra no se usan como texto pequeño sin comprobar contraste.

## Typography

**Display Font:** Fraunces, con Georgia y serif como alternativas.
**Body Font:** Inter, con Arial y sans-serif como alternativas.

**Character:** La serif aporta humanidad y carácter editorial; la sans mantiene una lectura limpia y precisa. Se cargan archivos locales mediante Fontsource: Fraunces regular y medium, cursiva regular; Inter regular, medium y semibold. No se sintetizan variantes.

### Hierarchy

- **Display:** hero de dos líneas; escala fluida y tracking compacto según el frontmatter. En móvil se usa `clamp(44px, 8vw, 62px)`, con interlineado (1.18).
- **Headline:** títulos de sección. Estudio y contacto afinan su interlineado (1.12 y 1.13). El estudio móvil usa (40px), contacto y exploraciones (36px).
- **Title:** nombres de proyectos. Las disciplinas usan Fraunces medium para la pestaña y regular para el panel; no tratar esos roles como títulos intercambiables.
- **Body:** párrafos de contenido; hero y presentación del estudio suben a (18px) en escritorio. El hero se limita a (640px), la presentación del estudio a (720px).
- **Label:** cejas en mayúsculas con espaciado entre letras. La navegación y acciones usan Inter medium o regular sin convertir todo el texto a mayúsculas.
- **Cápsula:** Fraunces cursiva regular, proporcional al título; se conserva la palabra estática «realidades.».

**The Dos Voces Rule.** Fraunces expresa títulos y marca; Inter organiza lectura, navegación, acciones y campos.

## Layout

El contenedor principal tiene máximo (1280px) y resta (128px) al ancho de pantalla: margen lateral de (64px). La navegación tiene máximo (1152px); contacto (944px); formulario (640px). La navegación es fija, con anclas desplazadas (116px) para evitar títulos tapados.

En anchos de hasta (1100px), el contenedor resta (64px), la navegación compacta sus separaciones y los paneles reducen padding. Las disciplinas conservan dos columnas (1fr / 1.25fr), y las exploraciones pasan de (2fr / 1fr) a (1.6fr / 1fr).

En anchos de hasta (767px), el contenedor resta (48px), la barra incorpora el botón Menú y oculta el CTA adicional. Las disciplinas, exploraciones y encabezados se apilan. Las acciones del hero ocupan como máximo (270px) y el proceso cambia a número/título con texto debajo. Los enlaces del menú siguen disponibles sin JavaScript; con mejora progresiva se muestran al abrirlo.

La separación de sección dominante es (112px) en escritorio y (64px) en móvil. Los grupos internos se apoyan en el ritmo del frontmatter. La secuencia concreta de portal, selector, exploraciones, estudio y contacto pertenece a la landing aprobada; futuras superficies heredan el lenguaje, no necesariamente esa composición.

## Elevation & Depth

La profundidad es principalmente tonal y arquitectónica. Tarjetas y campos descansan sin sombras; navegación y portal tienen sombras ambientales discretas. El vidrio se limita a la barra y la franja del portal: ambas tienen un fondo crema casi opaco por defecto y una versión algo más transparente con desenfoque (12px) cuando el navegador lo admite.

### Shadow Vocabulary

- **Navegación ambiental:** `0 8px 32px -8px rgb(27 31 30 / 9%)`.
- **Portal ambiental:** `0 24px 48px -24px rgb(27 31 30 / 28%)`.
- **Halo de foco en acciones:** `0 0 0 7px var(--forest)`; acompaña el contorno salvia, no expresa elevación.
- **Backdrop de diálogo:** oscurece el entorno con `rgb(15 37 27 / 68%)`, sin añadir desenfoque ornamental.

**The Vidrio Legible Rule.** El desenfoque es una mejora progresiva: la superficie opaca conserva contraste y lectura cuando no está disponible.

## Shapes

Acciones, etiquetas y palabra del hero usan cápsulas. Tarjetas, portal, panel y diálogo usan esquinas suaves; en móvil se compactan las superficies según el token correspondiente. Imágenes interiores y franjas tienen un radio menor que sus contenedores. Controles circulares expresan apertura/cierre, con objetivo de (44px). Bordes finos distinguen capas sin ruido.

El arco de la imagen arquitectónica es la expresión visual del umbral. No redibujarlo ni reemplazar el recurso original para reinterpretar la identidad.

## Components

### Buttons

Acciones serenas y legibles. El botón primario combina bosque y marfil, cápsula y padding normativo. Su altura es un mínimo de (50px), aunque el frontmatter usa el campo portable `height`; nunca fijar una altura que recorte una etiqueta larga. El CTA de navegación compacta a un mínimo de (44px). La variante contorneada conserva fondo transparente, texto bosque y borde vegetal.

Hover de color solo en dispositivos con hover y puntero preciso; presión inmediata con bosque más oscuro. No hay transición, transform ni animación. En foco, contorno salvia (3px), separación (5px) y halo bosque. El envío pendiente usa bosque atenuado, estado disabled y mensaje permanente: no aparenta disponibilidad.

### Chips

La etiqueta de foco usa crema y bosque. Los servicios se presentan como etiquetas informativas con borde mineral y superficie derivada; no son botones ni filtros. La etiqueta de proyecto mantiene explícito «Exploración conceptual» sobre la imagen.

### Cards / Containers

Tarjetas y paneles usan superficie mineral, borde fino y radio de superficie. El proyecto tiene padding (22px), reducido a (18px) en tablet/móvil; el detalle (32px), (26px) y (24px) según el ancho. Las imágenes usan recorte suave y `object-fit: cover`. La tarjeta destacada ocupa dos filas en escritorio y recupera proporciones normales al apilarse.

### Inputs / Fields

Etiquetas permanentes sobre campos cálidos, borde tenue, radio de campo y texto de (16px). El foco usa contorno bosque (3px) con separación (5px); el placeholder tiene contraste de lectura secundaria y no sustituye la etiqueta. Textarea redimensionable verticalmente, con mínimo (150px). La validación es nativa; no existe un estilo propio de error ni un estado de éxito simulado.

### Navigation

Barra flotante de vidrio, marca Fraunces y enlaces Inter. Hover subraya enlaces; no hay scrollspy ni estado activo persistente implementado. El menú móvil comunica `aria-expanded`, se cierra al seguir un enlace, pulsar Escape o hacer clic fuera, y se reinicia al cruzar el breakpoint móvil. Escape devuelve el foco al botón.

### Selector de disciplinas

Lista vertical de tres pestañas y panel contiguo en escritorio; apilados en móvil. El seleccionado cambia borde y superficie sin movimiento. Semántica `tablist/tab/tabpanel`, un tabulador activo, relaciones accesibles y flechas/Home/End mantienen navegación completa por teclado. La primera disciplina aparece seleccionada.

### Cápsula del hero y fichas

La cápsula es estática. Los controles circulares abren fichas en un diálogo nativo con título, descripción y alternativa de imagen por proyecto. Abrir mueve el foco al cierre; cerrar lo devuelve al disparador. La acción de contacto cierra la ficha y enfoca nombre. El `srcset` del diálogo cambia junto con `src`, `sizes`, `alt` y las dimensiones nativas para evitar la imagen de un proyecto anterior.

## Do's and Don'ts

### Do:

- Do conservar la paleta clara, la pareja Fraunces/Inter y la referencia aprobada.
- Do mantener foco visible y objetivos de interacción de al menos 44px donde están implementados.
- Do mantener etiquetas permanentes, texto de campo de 16px y estados de envío honestos.
- Do adaptar columnas y márgenes a los dos breakpoints reales, preservando el orden de lectura.
- Do identificar las exploraciones como conceptuales y conservar alternativas textuales de sus imágenes.

### Don't:

- Don't añadir animaciones, rotación automática, transiciones ornamentales o 3D sin consultar al propietario.
- Don't redibujar el logo ausente ni reemplazar la marca textual provisional por un símbolo inventado.
- Don't presentar el build local como publicación o el formulario pendiente como envío exitoso.
- Don't convertir la composición de esta landing en una obligación para todas las futuras superficies.
- Don't inventar clientes, métricas, testimonios, documentos legales o licencias de publicación.

Estado documentado: implementación y revisión local; no publicación. Pendientes del propietario: logo original, dominio, endpoint y activación de FormSubmit, textos legales, proyectos reales y autorización de uso público de imágenes. Build y comprobaciones locales no acreditan entrega de correo, licencias ni disponibilidad pública.

