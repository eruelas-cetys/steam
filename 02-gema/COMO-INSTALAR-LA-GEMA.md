# Cómo instalar la Gema «Diseñador de Proyectos STEAM»

Esta carpeta trae los tres archivos necesarios para instalar el asistente conversacional en Gemini. Instalarlo toma unos cinco minutos y no requiere escribir código.

---

## 1 · Crear el Gem

1. Entre a `gemini.google.com` → menú lateral → **Gems** → **Nuevo Gem**.
2. **Nombre:** `Diseñador de Proyectos STEAM`.
3. En el campo **Instrucciones**, abra `gem-disenador-proyectos-steam.md` y pegue todo lo que aparece **desde `## IDENTIDAD` hasta el final del documento**. El encabezado del archivo (esta misma explicación, en su versión corta) no se pega.

## 2 · Cargar el conocimiento

En la sección **Conocimiento** del mismo Gem, suba estos dos archivos, en PDF —Gemini los procesa de forma más confiable que en Markdown—:

| Archivo | ¿Obligatorio? | Para qué sirve |
|---|---|---|
| `conocimiento-plantilla-steam.pdf` | Recomendado | El formato oficial completo, con sus instrucciones y ejemplos, para que el Gem redacte en el mismo formato que usará el docente. |
| `conocimiento-ajustes-razonables.pdf` | **Obligatorio** | El catálogo de diez situaciones y sus sugerencias. Sin este archivo, el Gem no tiene de dónde tomar los apoyos y podría improvisarlos — algo que las reglas del propio Gem prohíben. |

## 3 · Guardar y probar

Guarde el Gem. Ábralo desde una cuenta distinta a la suya y escriba «hola»: debe saludar, explicar brevemente el proceso y hacer una sola pregunta para comenzar. Si hace más de una pregunta a la vez, revise que copió las instrucciones completas.

---

## Qué entrega al terminar

Al final de la conversación, el Gem entrega la planeación completa en **texto plano, listo para copiarse y pegarse** sobre `01-docentes/Plantilla-Proyecto-STEAM.docx`, sección por sección. No genera un documento por sí mismo.

Si su institución necesita que el resultado llegue como un Google Doc ya formateado en lugar de texto para copiar y pegar, existe un script opcional para eso en `../05-opcional/crear-documento-planeacion.gs`. Es un paso adicional pensado para quien administra varias planeaciones a la vez, no para el uso normal del Gem.

---

## Regla de privacidad, para quien instale o supervise

El Gem **nunca pide el nombre de ningún alumno**. Cuando un docente menciona que hay estudiantes que necesitarán apoyos específicos, el Gem los nombra por su cuenta como «Alumno 1», «Alumno 2»… y esa es la única referencia que queda escrita en la planeación. Si un docente escribe un nombre real de todos modos, el Gem no lo repite ni lo incorpora al documento. Esta regla es intencional y no debe modificarse al adaptar las instrucciones.

---

## Sin crear un Gem

También funciona sin instalar nada: pegar el mismo bloque de instrucciones como primer mensaje de una conversación normal de Gemini produce el mismo comportamiento, aunque hay que repetirlo cada vez y se pierde el conocimiento cargado.

---

## Licencia y créditos

**Kit STEAM** — Versión 1.0 · Septiembre de 2026

| Rol | Persona |
|---|---|
| Diseño y desarrollo | **Dr. Emmanuelle Ruelas Gómez** |
| Contenido pedagógico | Dr. Emmanuelle Ruelas Gómez · Ing. Daniel Millan Alcantara · Mtra. Emarinia Angulo Camacho · Mtra. Miriam Melero Hernández |
| Revisión y validación | Dr. Juan Terrazas Gaynor |
| Gestión y eventos | Ing. Daniel Millan Alcantara · Dra. Verónica Rojas Mendizábal |
| Institución | CETYS - Universidad |

Esta obra se distribuye bajo licencia **Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)** — https://creativecommons.org/licenses/by-sa/4.0/deed.es
