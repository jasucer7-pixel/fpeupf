# Segunda Mente FPE

Web para organizar el estudio del grado en Filosofía, Política y Economía (UPF): motivarte, concentrarte más tiempo y no agobiarte.

**Web:** https://jasucer7-pixel.github.io/fpeupf/ (se puede instalar en el móvil: «Añadir a pantalla de inicio»).

## Secciones
- **Hoy**: meta diaria de minutos con anillo de progreso, tu porqué, racha, nivel y monedas; energía del día (limita cuántas tareas eliges); tareas de hoy; lo que se quedó pendiente (sin culpa); clases del día; tarjetas por repasar; fechas próximas; cierre del día.
- **Foco**: temporizador 25/5, 50/10, 90/20 o 15/3 con pausas largas, objetivo del bloque, contador de distracciones, +5 min, modo zen a pantalla completa, sonido de fondo (ruido marrón, lluvia, blanco), encadenado automático, aviso al terminar y valoración de la concentración.
- **Plan**: lista por fechas, semana (repartir tareas por día), exámenes con cuenta atrás y plan de repaso espaciado automático, horario de clases y asignaturas con horas objetivo por semana. Tareas que se repiten cada semana.
- **Ficha de asignatura** (Plan → Asignaturas): temario con nivel de dominio por tema, calculadora de nota (qué necesitas sacar en lo que queda, con notas mínimas), recursos y enlaces, tareas, clases y estadísticas. Expediente con media ponderada por ECTS en Progreso.
- **Calendario mensual** con fechas límite y minutos estudiados, y exportación a Google Calendar (.ics) con aviso el día antes de exámenes y entregas.
- **Hábitos diarios** con rachas y **retos semanales** que dan monedas extra.
- **Test rápido** de opción múltiple con tus tarjetas, y **buscador global** (Ctrl/⌘ + K o /).
- **Planificador automático** (Plan → Semana): reparte las tareas sin día en los próximos 14 días según fecha límite, duración, capacidad diaria y día de descanso.
- **Jardín de foco**: cada bloque planta un brote, una flor, un arbusto o un árbol según su duración, del color de la asignatura. Detecta si sales de la pestaña durante un bloque.
- **Lecturas** con páginas leídas y páginas por día necesarias; **cuaderno por tema** para explicarlo con tus palabras (técnica Feynman) y convertirlo en tarjeta.
- **Gráficas** de horas por semana y reparto por asignatura; **deshacer** al borrar y **copias automáticas** diarias (últimas 7).
- **Hoy personalizable**: elige qué tarjetas ves y en qué orden, o activa el **modo mínimo** (solo tu meta y lo de hoy).
- **Sesión de estudio en cola**: prepara varios bloques seguidos y Foco carga el siguiente al terminar cada uno. **Subtareas** (pasos) dentro de cada tarea.
- **Comodín de racha** (50 monedas): protege tu racha si un día no puedes estudiar. **Celebraciones** al subir de nivel, desbloquear logros, cobrar retos o terminar lo de hoy.
- **Guía rápida** (tecla ?) con la rutina recomendada y los atajos; el coach te da un **resumen de la semana pasada** los lunes.
- **Concentración**: modo **flowtime** (sin límite, pausa proporcional), sonidos de olas, cafetería y biblioteca, **ritual de inicio** antes de cada bloque y **análisis de distracciones** por hora y asignatura.
- **Calendario** completo (día, semana por horas, mes y agenda) con tus eventos (también semanales), clases, fechas límite, tareas planificadas y bloques hechos. Exportable a Google Calendar.
- **Organización**: tiempo real frente a estimado (el planificador aprende tu ritmo), vista del **trimestre**, matriz **urgente/importante** y **plantillas semanales** por asignatura.
- **Motivación**: **liga contra tu semana pasada**, imagen para **compartir tu semana**, **Mi camino** (hitos hacia la UE, la OTAN o la ONU), **tienda** de colores y jardines, **logros secretos y de trimestre** y **carta a tu yo futuro**.
- **Bienestar**: sueño y ánimo con su efecto en tu estudio, aviso de **semana sobrecargada**, **modo vacaciones** y **tarro de logros**.
- **Coach**: entrenador sin IA que conoce tus tareas, exámenes y horas. Entiende órdenes («añade examen de Matemáticas el jueves», «apunta una duda: …», «empieza un bloque de 50 min»), te dice qué hacer ahora, te hace un plan para hoy, te anima cuando estás agobiado o sin ganas, te da técnicas de estudio por asignatura y explica unos 90 conceptos clave de FPE.
- **Repasar**: tarjetas con repetición espaciada (estilo Anki), por asignatura, alta masiva con `pregunta :: respuesta`.
- **Mente**: notas rápidas (apuntes, ideas, dudas, descarga mental), búsqueda, convertir en tarea o tarjeta. Captura rápida desde cualquier pantalla con el botón + o la tecla N.
- **Progreso**: niveles y XP, recompensas que canjeas con monedas (cada una indica cuánto tiempo de estudio te falta para conseguirla), mapa de constancia, horas por asignatura, tu hora más productiva, 18 logros y revisión semanal.
- **Calma**: plan anti-agobio en 3 pasos, respiración guiada, lo que depende de mí (Epicteto), regla de los 5 minutos.

## Datos y sincronización entre móvil y ordenador
1. En el ordenador, pulsa el aviso «Solo en este dispositivo» de la pantalla Hoy (o Ajustes → Configurar sincronización).
2. Crea una llave de acceso en GitHub con el enlace del asistente (permiso `gist` ya marcado, sin caducidad), cópiala y pégala. Tus datos se guardan en un gist privado de tu cuenta.
3. El asistente muestra un **código QR**: escanéalo con la cámara del móvil y la web se abre ya vinculada. También puedes copiar el enlace de vinculación y abrirlo en el otro dispositivo.

Cada dispositivo sube sus cambios a los pocos segundos y descarga los de los demás cada minuto y al volver a la app. Los cambios se unen (incluidos los borrados), así que puedes usar los dos a la vez. Sin sincronización, los datos se guardan solo en el navegador; en Ajustes hay copias automáticas y exportación. Con sincronización, en Ajustes → Historial de versiones puedes volver a cualquier versión guardada en GitHub.

La interfaz está también en **catalán (beta)**: Ajustes → Idioma. Las respuestas del coach y algunos textos largos siguen en castellano.

## Desarrollo
[![Pruebas](https://github.com/jasucer7-pixel/fpeupf/actions/workflows/pruebas.yml/badge.svg)](https://github.com/jasucer7-pixel/fpeupf/actions/workflows/pruebas.yml)

Cada cambio pasa por `npm test` (Playwright) en GitHub Actions: primer uso, migración de datos, todas las secciones, tareas y deshacer, foco, calendario, coach, sincronización entre dos dispositivos con historial de versiones y catalán. Los datos de prueba son inventados.

`vendor/qrcode-generator.js` es [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) de Kazuhiko Arase (licencia MIT).
`src/segunda-mente.html` es la fuente (también se publica como artefacto de Claude, donde guarda en tu cuenta y tiene IA). `./build.sh` genera `index.html` para GitHub Pages.
