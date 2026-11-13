# Segunda Mente FPE

Web para organizar el estudio del grado en Filosofía, Política y Economía (UPF): motivarte, concentrarte más tiempo y no agobiarte.

**Web:** https://jasucer7-pixel.github.io/fpeupf/ (se puede instalar en el móvil: «Añadir a pantalla de inicio»).

## Secciones
- **Hoy**: meta diaria de minutos con anillo de progreso, tu porqué, racha, nivel y monedas; energía del día (limita cuántas tareas eliges); tareas de hoy; lo que se quedó pendiente (sin culpa); clases del día; tarjetas por repasar; fechas próximas; cierre del día.
- **Foco**: temporizador 25/5, 50/10, 90/20 o 15/3 con pausas largas, objetivo del bloque, contador de distracciones, +5 min, modo zen a pantalla completa, sonido de fondo (ruido marrón, lluvia, blanco), encadenado automático, aviso al terminar y valoración de la concentración.
- **Plan**: lista por fechas, semana (repartir tareas por día), exámenes con cuenta atrás y plan de repaso espaciado automático, horario de clases y asignaturas con horas objetivo por semana. Tareas que se repiten cada semana.
- **Repasar**: tarjetas con repetición espaciada (estilo Anki), por asignatura, alta masiva con `pregunta :: respuesta`.
- **Mente**: notas rápidas (apuntes, ideas, dudas, descarga mental), búsqueda, convertir en tarea o tarjeta. Captura rápida desde cualquier pantalla con el botón + o la tecla N.
- **Progreso**: niveles y XP, recompensas que canjeas con monedas, mapa de constancia, horas por asignatura, tu hora más productiva, 18 logros y revisión semanal.
- **Calma**: plan anti-agobio en 3 pasos, respiración guiada, lo que depende de mí (Epicteto), regla de los 5 minutos.

## Datos
En la web los datos se guardan en el navegador. En **Ajustes → Tus datos** puedes descargar una copia (.json) y restaurarla en otro navegador o en la versión de Claude. Haz copias de vez en cuando.

## Desarrollo
`src/segunda-mente.html` es la fuente (también se publica como artefacto de Claude, donde guarda en tu cuenta y tiene IA). `./build.sh` genera `index.html` para GitHub Pages.
