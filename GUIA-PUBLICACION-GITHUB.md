# Cómo publicar el Kit STEAM en GitHub

Guía paso a paso. Cada paso indica si se hace **desde el navegador** —sin escribir comandos— o **desde la terminal**. Puede hacerlo todo desde el navegador si prefiere; la terminal solo ahorra tiempo cuando ya hay muchos archivos.

Tiempo estimado: **45 minutos** la primera vez.

---

# Antes de empezar · cuatro decisiones

Resuélvalas antes de tocar GitHub. Cambiarlas después cuesta más.

### 1 · ¿A nombre de quién? — ya decidido

Cuenta: **`eruelas-cetys`**. Si es una cuenta personal (no una organización de GitHub), tenga en cuenta que el repositorio queda asociado a esa persona y no a la institución — sobrevive mientras la cuenta exista, pero no se transfiere automáticamente si esa persona deja CETYS. Si prefiere blindarlo institucionalmente más adelante, GitHub permite transferir un repositorio a una organización sin perder historial ni liga.

### 2 · Nombre del repositorio — ya decidido

**`steam`**.

La dirección queda así: `github.com/eruelas-cetys/steam`

### 3 · Verifique la licencia de CAST

Antes de publicar, confirme en `udlguidelines.cast.org` bajo qué licencia Creative Commons se distribuyen las Directrices DUA 3.0. Si incluye cláusula **CompartirIgual**, su elección de CC BY-SA 4.0 deja de ser preferencia y pasa a ser requisito de compatibilidad. Anótelo en el acta del colectivo.

### 4 · Complete los créditos

Ya están llenos: contenido pedagógico, revisión y validación, gestión y eventos, institución y contacto. Antes de publicar, confirme que los nombres estén completos y bien escritos en todos los archivos — una vez que la gente descargue los archivos, ya no verá las correcciones posteriores.

---

# Paso 1 · Crear el repositorio

**Desde el navegador.**

1. Entre a `github.com` e inicie sesión.
2. Botón **New** (o `github.com/new`).
3. Llene:
   - **Repository name:** `steam`
   - **Description:** `Kit para el diseño, implementación y valoración de proyectos STEAM de aula. Design Thinking en cinco fases y Nueva Escuela Mexicana.`
   - **Public** ← importante, si va a ser abierto
   - ☑ **Add a README file**
   - **Add .gitignore:** None
   - **Choose a license:** busque y elija **Creative Commons Attribution Share Alike 4.0 International**
4. **Create repository**.

> GitHub genera el archivo `LICENSE` con el texto legal completo de CC BY-SA 4.0. Eso le ahorra copiarlo a mano y es el texto oficial.

---

# Paso 2 · Crear la estructura de carpetas

**Desde el navegador.** En GitHub, las carpetas se crean al subir archivos dentro de ellas; no existen vacías.

Estructura propuesta:

```
steam/
├── README.md
├── LICENSE
├── CITATION.cff
├── CHANGELOG.md
│
├── 01-docentes/
│   ├── Cuadernillo-Trabajo-STEAM.pdf      ← binder impreso: portada + las tres partes de abajo, compiladas
│   ├── Plantilla-Proyecto-STEAM.pdf
│   ├── Plantilla-Proyecto-STEAM.docx
│   ├── Hojas-Trabajo-STEAM.pdf
│   ├── Hojas-Trabajo-STEAM.docx
│   ├── Anexo-Ajustes-Razonables-STEAM.pdf
│   └── Anexo-Ajustes-Razonables-STEAM.docx
│
├── 02-gema/
│   ├── gem-disenador-proyectos-steam.md
│   ├── conocimiento-plantilla-steam.pdf
│   ├── conocimiento-ajustes-razonables.pdf
│   └── COMO-INSTALAR-LA-GEMA.md
│
├── 03-evaluacion/
│   ├── README.md                          ← enlace público al formulario de la rúbrica
│   ├── Rubrica-Transferencia-STEAM.pdf
│   ├── Rubrica-Transferencia-STEAM.docx
│   └── crear-formulario-rubrica-steam.gs
│
├── 04-capacitacion/
│   ├── README.md                          ← enlace público al cuestionario de evaluación
│   ├── Capacitacion-Gema-STEAM.pdf
│   ├── Capacitacion-Gema-STEAM.pptx
│   ├── Capacitacion-Evaluadores-Rubrica-STEAM.pdf
│   ├── Capacitacion-Evaluadores-Rubrica-STEAM.pptx
│   └── crear-cuestionario-evaluacion-docentes.gs
│
└── 05-opcional/
    └── crear-documento-planeacion.gs
```

Los números al inicio fuerzan el orden de aparición y le dicen al visitante por dónde empezar.

**Por qué cada Word y cada PowerPoint tiene también su PDF.** GitHub no previsualiza `.docx` ni `.pptx` en el navegador: solo ofrece descargarlos. El `.pdf` sí se abre directamente al hacer clic, sin descargar nada. Por eso cada documento del kit —excepto el código— se sube en ambos formatos: el `.pdf` para verlo en GitHub, el `.docx`/`.pptx` para editarlo.

**Por qué `03-evaluacion/` y `04-capacitacion/` tienen su propio README.** GitHub muestra automáticamente el `README.md` de una carpeta debajo de la lista de archivos en cuanto alguien entra a ella. Ahí viven los enlaces para *responder* los formularios de Google (rúbrica y cuestionario de evaluación). **Importante:** el enlace que se publica siempre es el de responder (`.../viewform`), nunca el de editar (`.../edit`) — ese segundo le da a cualquiera con el enlace permiso para modificar las preguntas y ver todas las respuestas de los demás. Guarde los enlaces de edición aparte, fuera del repositorio. Si necesita un formulario nuevo, vuelva a correr el script `.gs` correspondiente y actualice el enlace en ese README.

**Cómo hacerlo:** en la página del repositorio, **Add file → Upload files**. Arrastre los archivos. Para crear la carpeta, escriba `01-docentes/` al inicio del nombre en el campo de ruta, o simplemente arrastre una carpeta completa desde su computadora: GitHub conserva la estructura.

---

# Paso 3 · Escribir el README

El README es la portada. Es lo único que la mayoría va a leer.

**Desde el navegador:** abra `README.md` → ícono del lápiz → pegue el contenido → **Commit changes**.

Use el archivo `README.md` que acompaña a esta guía — ya está completo: correo de contacto, liga de la Gema y liga de descarga (`github.com/eruelas-cetys/steam`) puestos. Puede pegarlo tal cual.

---

# Paso 4 · Agregar el archivo de citación

`CITATION.cff` le dice a GitHub cómo debe citarse el material. GitHub muestra automáticamente un botón **Cite this repository** en la barra lateral.

**Add file → Create new file**, nómbrelo `CITATION.cff` y pegue:

```yaml
cff-version: 1.2.0
message: "Si utiliza este material, por favor cítelo como se indica."
title: "Kit STEAM para el diseño de proyectos de aula"
abstract: "Kit completo para el diseño, implementación y valoración de proyectos STEAM de aula, con metodología de Design Thinking en cinco fases y anclaje en la Nueva Escuela Mexicana."
version: "1.0"
date-released: "2026-09-19"
license: CC-BY-SA-4.0
type: dataset
authors:
  - family-names: "Ruelas Gómez"
    given-names: "Emmanuelle"
    name-suffix: "Dr."
keywords:
  - STEAM
  - Design Thinking
  - Nueva Escuela Mexicana
  - Diseño Universal para el Aprendizaje
  - educación básica
  - recursos educativos abiertos
```

---

# Paso 5 · Agregar el CHANGELOG

Este archivo es el que evita el problema que ya tuvieron: alguien trabajando con una versión vieja del catálogo sin saberlo.

**Create new file**, nómbrelo `CHANGELOG.md`:

```markdown
# Historial de versiones

## [1.0] — Septiembre 2026
Publicación inicial del kit completo.

- Plantilla de planeación en diez secciones
- Anexo de ajustes razonables con diez situaciones
- Instrucciones y archivos de conocimiento de la Gema
- Rúbrica de valoración de transferencia con doce criterios
- Dos presentaciones de capacitación
- Scripts de generación de formulario y documento
```

---

# Paso 6 · Publicar la versión 1.0

Un *release* congela el estado actual y genera un archivo `.zip` con todo el kit. Es lo que la gente va a descargar.

**Desde el navegador.**

1. En la página del repositorio, barra lateral derecha → **Releases** → **Create a new release**.
2. **Choose a tag** → escriba `v1.0` → **Create new tag**.
3. **Release title:** `Kit STEAM v1.0`
4. **Describe this release:** pegue el contenido del CHANGELOG.
5. **Publish release**.

GitHub genera automáticamente `Source code (zip)`. Si quiere un nombre más amigable, comprima usted el kit y adjúntelo como archivo adicional: `Kit-STEAM-v1.0.zip`.

> **Este paso le da la métrica que buscaba con el formulario.** En la página del release, GitHub cuenta las descargas de cada archivo adjunto, sin pedirle nada al usuario.

---

# Paso 7 · Página de aterrizaje *(opcional pero recomendado)*

Para que el docente vea una página limpia con botones de descarga, en lugar de la interfaz de GitHub.

1. **Settings** → **Pages** (menú lateral).
2. **Source:** Deploy from a branch.
3. **Branch:** `main`, carpeta `/ (root)` → **Save**.
4. Espere dos o tres minutos.

Su sitio quedará en `https://eruelas-cetys.github.io/steam/`

GitHub Pages toma el README como página principal. Si quiere un diseño propio, cree un archivo `index.html` en la raíz y ese tendrá prioridad.

**Elegir un tema visual:** Settings → Pages → **Theme chooser**. Con cualquiera de los temas incluidos el README se ve razonablemente bien sin escribir HTML.

---

# Paso 8 · Terminar de configurar el repositorio

**Desde el navegador**, en la página principal del repositorio:

1. Ícono de engrane junto a **About** (arriba a la derecha).
2. **Description:** la misma del paso 1.
3. **Website:** la liga de GitHub Pages, si la activó.
4. **Topics:** agregue etiquetas para que el repositorio aparezca en búsquedas:
   `steam-education`, `design-thinking`, `open-educational-resources`, `udl`, `educacion`, `mexico`, `nueva-escuela-mexicana`
5. Desmarque **Releases** y **Packages** si no quiere que aparezcan en la barra lateral. Deje **Releases** marcado: es donde está la descarga.

---

# Paso 9 · Conectar la Gema

El repositorio distribuye los archivos; la Gema se comparte aparte. La liga ya está puesta en el README:

`https://gemini.google.com/gem/1CU8PMaLrnnSPqOltSaSx2SMpcUF2O90s?usp=sharing`

**Verifique antes de publicar** que esa liga abre la Gema desde una cuenta de Google distinta a la suya, con permiso de **Cualquiera con el enlace** (Gemini → abra la Gema → menú → **Compartir**).

> **Advertencia.** Si la Gema vive en una cuenta institucional, es posible que solo pueda compartirse dentro de la organización. En ese caso deje en el README las instrucciones para que cada quien cree la suya con los archivos de la carpeta `02-gema/`, y aclare esa limitación.

---

# Paso 10 · DOI permanente *(opcional)*

Si el kit va a citarse en publicaciones académicas, conviene un identificador permanente.

1. Entre a `zenodo.org` e inicie sesión **con su cuenta de GitHub**.
2. En Zenodo: menú → **GitHub** → active el interruptor junto a `steam`.
3. Vuelva a GitHub y publique un release nuevo —o vuelva a publicar el v1.0—.
4. Zenodo archiva automáticamente ese release y emite un DOI.
5. Copie la insignia del DOI y péguela al inicio del README.

A partir de ahí, el kit se cita con un DOI estable, igual que un artículo.

---

# Cómo publicar una versión nueva después

Cuando corrijan el catálogo o agreguen material:

1. Suba los archivos corregidos, reemplazando los anteriores.
2. Agregue la entrada correspondiente en `CHANGELOG.md`.
3. Actualice el número de versión en `CITATION.cff`.
4. Cree un release nuevo: `v1.1`, con las notas de qué cambió.
5. Si usa Zenodo, el DOI de la versión nueva se emite solo.

**Regla útil:** cambios de redacción o correcciones menores → `v1.1`, `v1.2`. Cambios que obligan a recapacitar a alguien —criterios de la rúbrica, estructura de la plantilla— → `v2.0`.

---

# Ruta por terminal, si prefiere

Para quien ya usa git. Equivale a los pasos 1 a 6.

```bash
# Dentro de la carpeta con los archivos del kit
git init
git branch -M main

# Archivo para excluir lo que no debe publicarse
cat > .gitignore <<'FIN'
build/
~$*
.DS_Store
Thumbs.db
*.tmp
FIN

git add .
git commit -m "Kit STEAM v1.0 — publicación inicial"

# Reemplace eruelas-cetys por la suya
git remote add origin https://github.com/eruelas-cetys/steam.git
git push -u origin main

# Etiqueta de versión
git tag -a v1.0 -m "Kit STEAM v1.0"
git push origin v1.0
```

Después entre a GitHub y convierta la etiqueta en release desde **Releases → Draft a new release → Choose a tag → v1.0**.

---

# Lista de verificación final

Antes de anunciar el repositorio, confirme:

- [ ] La licencia de CAST está verificada y el resultado documentado
- [ ] Los campos de créditos (contenido pedagógico, revisión y validación, gestión y eventos, institución, contacto) están llenos y bien escritos en todos los archivos
- [ ] El repositorio es **público**
- [ ] El archivo `LICENSE` existe y dice CC BY-SA 4.0
- [ ] El README explica en las primeras cinco líneas qué es el kit y para quién
- [ ] Hay un release `v1.0` con archivo descargable
- [ ] La liga de la Gema funciona desde una cuenta distinta a la suya
- [ ] Descargó el `.zip` del release y abrió los archivos: nada corrupto, nada faltante
- [ ] Alguien ajeno al proyecto pudo instalar la Gema siguiendo solo el README

El último punto es el que más vale. Pídale a un docente que no participó en esto que intente usarlo sin su ayuda, y observe dónde se atora.

---

## Licencia y créditos

**Kit STEAM** — Versión 1.0 · Septiembre de 2026

| Rol | Persona |
|---|---|
| Diseño y desarrollo | **Dr. Emmanuelle Ruelas Gómez** |
| Contenido pedagógico | Dr. Emmanuelle Ruelas Gómez · Ing. Daniel Millan Coronado · Mtra. Emarinia Angulo Camacho · Mtra. Miriam Melero Hernández · Dra. Silvia Lizeth Becerra Rojas · M en C. Maritza Patricia López Solorio |
| Revisión y validación | Dr. Juan Terrazas Gaynor |
| Gestión y eventos | Ing. Daniel Millan Coronado · Dra. Verónica Rojas Mendizábal |
| Institución | CETYS - Universidad |
| Contacto | emmanuelle.ruelas@cetys.mx |

Esta obra se distribuye bajo licencia **Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)** — https://creativecommons.org/licenses/by-sa/4.0/deed.es
