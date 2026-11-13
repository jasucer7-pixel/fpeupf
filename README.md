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
- **Coach**: entrenador sin IA que conoce tus tareas, exámenes y horas. Entiende órdenes («añade examen de Matemáticas el jueves», «apunta una duda: …», «empieza un bloque de 50 min»), te dice qué hacer ahora, te hace un plan para hoy, te anima cuando estás agobiado o sin ganas, te da técnicas de estudio por asignatura y explica unos 90 conceptos clave de FPE.
- **Repasar**: tarjetas con repetición espaciada (estilo Anki), por asignatura, alta masiva con `pregunta :: respuesta`.
- **Mente**: notas rápidas (apuntes, ideas, dudas, descarga mental), búsqueda, convertir en tarea o tarjeta. Captura rápida desde cualquier pantalla con el botón + o la tecla N.
- **Progreso**: niveles y XP, recompensas que canjeas con monedas (cada una indica cuánto tiempo de estudio te falta para conseguirla), mapa de constancia, horas por asignatura, tu hora más productiva, 18 logros y revisión semanal.
- **Calma**: plan anti-agobio en 3 pasos, respiración guiada, lo que depende de mí (Epicteto), regla de los 5 minutos.

## Datos y sincronización
En **Ajustes → Sincronización entre dispositivos** pegas un token de GitHub con permiso `gist` y tus datos se guardan en un gist privado de tu cuenta, compartido entre todos tus dispositivos (se unen automáticamente, incluidos los borrados). Sin sincronización, los datos se guardan solo en el navegador. En **Ajustes → Tus datos** puedes descargar una copia (.json) y restaurarla en otro navegador o en la versión de Claude. Haz copias de vez en cuando.

## Desarrollo
`src/segunda-mente.html` es la fuente (también se publica como artefacto de Claude, donde guarda en tu cuenta y tiene IA). `./build.sh` genera `index.html` para GitHub Pages.
