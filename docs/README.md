# Sitio del Kit STEAM

Página estática de una sola vista para presentar el kit. No requiere paso de compilación: es HTML y CSS planos.

## Cómo publicarla con GitHub Pages

1. Suba esta carpeta `docs/` a la raíz del repositorio (junto con `01-docentes/`, `README.md`, etc.).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. **Branch: `main`**, carpeta **`/docs`**. Guardar.
4. GitHub le da la URL en un par de minutos, algo como `https://eruelas-cetys.github.io/steam/`.

Cada vez que edite `docs/index.html` y suba el cambio a `main`, el sitio se actualiza solo.

## Estructura

```
docs/
├── index.html          ← todo el sitio: una sola página
└── assets/
    ├── cetys-logotipo-negro.png     (nav y secciones claras)
    ├── cetys-logotipo-blanco.png    (pie de página, fondo negro)
    └── qr-github.png                (QR al repositorio, en el pie)
```

## Para cuando se agreguen fotos y videos

- **Fotos**: cópielas a `docs/assets/` (formato `.jpg` o `.webp`, idealmente menos de 300 KB cada una para que la página cargue rápido). Luego agregue una etiqueta `<img src="assets/nombre-del-archivo.jpg" alt="descripción breve">` donde quiera que aparezca — por ejemplo, dentro de las tarjetas de "Por dónde empezar" o "Qué incluye el kit", o como una nueva sección de galería antes del pie de página.
- **Videos**:
  - Si el video vive en YouTube o Vimeo, se incrusta con un `<iframe>` — no hay que subir el archivo de video al repositorio.
  - Si es un archivo propio (por ejemplo, una cápsula corta grabada en una capacitación), cópielo a `docs/assets/` y use la etiqueta `<video src="assets/nombre-del-archivo.mp4" controls></video>`. Convenga que los archivos de video no superen unos 20–30 MB para no inflar el repositorio; si son más pesados, mejor alojarlos en YouTube/Vimeo como no listados y usar el `<iframe>`.
- En ambos casos, dígame cuáles fotos o videos quiere y dónde, y yo integro el código — no hace falta tocar el CSS existente.

## Paleta institucional usada

| Color | Hex | Uso |
|---|---|---|
| Negro | `#000000` | Fondos institucionales (hero, recursos, pie) |
| Gris | `#75787B` | Texto secundario, etiquetas |
| Amarillo CETYS | `#FFCD00` | Acentos, botones principales, números destacados |
