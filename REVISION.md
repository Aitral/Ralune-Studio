# Implementación y revisión

Se conserva la composición de Stitch: navegación flotante, hero editorial con cápsula, portal arquitectónico, selector de disciplinas, tarjeta destacada con dos secundarias, estudio bosque, contacto y footer. La referencia extraída permanece intacta.

## Defectos corregidos — Impeccable y Emil Kowalski

| Antes | Después | Motivo |
| --- | --- | --- |
| Menú móvil sin todos los destinos | Menú con estado expandido, Escape y cierre al navegar | Acceso compacto a todas las secciones |
| Selector sin semántica ni teclado completo | Tablist vertical, tabpanel, selección y flechas/Home/End | Navegación predecible por teclado |
| Temporizadores al cambiar de disciplina | Actualización inmediata del panel | Una selección anterior no puede sobrescribir la actual |
| Flechas de proyecto sin acción | Fichas en diálogo nativo, Escape y retorno de foco | Cada exploración tiene una acción real |
| Imágenes con `data-alt` | `alt` descriptivo, tamaños y `srcset` | Alternativas textuales y recursos adaptados al ancho |
| Tailwind CDN y fuentes de iconos duplicadas | CSS compilado, fuentes locales y SVG coherentes | Elimina dependencias remotas en tiempo de ejecución |
| `transition: all`, rotación automática y restos de marquee | Interacciones inmediatas y hero estático | Respeta la consulta previa exigida para animaciones |
| Formulario de demostración ambiguo | Estado pendiente explícito y envío impedido sin configuración | Ningún éxito ficticio ni envío accidental |
| Enlaces legales hacia contacto | Solo enlaces a secciones existentes | No presenta documentos legales inexistentes |
| Año fijo y disponibilidad no confirmada | Año actual, sin indicador de disponibilidad | Información respaldada |
| Promesas de máximas puntuaciones y carga instantánea | Descripción del enfoque sin resultados garantizados | No se aportó evidencia de esas afirmaciones |
| Estilos importados exclusivamente desde JavaScript | Hoja CSS vinculada en el HTML | Lectura y diseño disponibles sin JavaScript |
| Botón Menú visible en escritorio | Solo aparece en móvil | Conserva la navegación de la referencia |
| El `srcset` del diálogo mantenía Forma al cambiar de proyecto | `src`, `srcset`, `sizes` y `alt` se actualizan juntos | La imagen elegida por el navegador coincide con la ficha |

## Verificaciones locales

- `npm run build`: correcto; landing y agradecimiento compilados.
- `npm run check`: sintaxis correcta.
- Playwright con Edge: 360, 390, 768, 1440 y 1600 px sin desbordamiento horizontal, imágenes cargadas y sin errores de consola.
- Teclado: flechas, Home/End, Escape, foco al cerrar fichas, menú y anclas comprobados.
- Formulario: deshabilitado sin endpoint, submit interceptado y conexiones al servicio bloqueadas en pruebas. Cero mensajes externos.
- Página de agradecimiento y regreso al sitio comprobados.
- Sin JavaScript: contenido y navegación legibles; formulario bloqueado.
- Movimiento reducido: no hay animaciones activas. No se añadieron efectos ni 3D.
- Capturas de escritorio, móvil y tablet inspeccionadas en una ronda agrupada, correcciones aplicadas en un lote y confirmadas en la siguiente.

El detector mecánico de Impeccable se ejecutó una vez. La imagen del diálogo recibió un `src` inicial. Su advertencia de jerarquía plana tomaba 16 px para todos los encabezados al no resolver los estilos del módulo; el navegador midió 44–92 px para el hero y 16 px para cuerpo. No se cambió la identidad por sugerencias genéricas del detector.

La revisión independiente de Impeccable confirmó la fidelidad de tipografía, imágenes, composición y adaptación móvil. Detectó un fallo en el `srcset` del diálogo, corregido en un lote. La comprobación dedicada confirmó que `currentSrc` corresponde a cada proyecto; el revisor marcó ese hallazgo como **resolved**, disposición **ship** al alcance de esa corrección. Las tres capturas de fichas quedan en `.impeccable/review/`.

## Decisiones opcionales

Animaciones, rotación de palabras y 3D requieren consulta previa. Se omitieron. Tema oscuro, analítica, CMS y backend propio quedan fuera del alcance. No se ha publicado el sitio.

## Datos del propietario pendientes

Endpoint y correo FormSubmit, activación y prueba real de entrega autorizada, dominio público, logo original, documentos legales y derechos de publicación de las imágenes de Stitch. Las exploraciones se sustituirán cuando haya proyectos reales.

## Límites

No se comprobaron entrega de correo, lectores de pantalla en un dispositivo real, teléfonos físicos ni métricas Core Web Vitals. Las comprobaciones locales no certifican estos resultados.
