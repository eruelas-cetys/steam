/**
 * ============================================================================
 *  PLANEACIÓN DE PROYECTO STEAM
 *  Genera el documento con el formato oficial a partir del bloque técnico
 *  que entrega el Gem «Diseñador de Proyectos STEAM».
 * ============================================================================
 *
 *  CÓMO USARLO
 *  1. Termine la conversación con el Gem hasta que le entregue el bloque
 *     que empieza con  ===PLANEACION-STEAM-V1===
 *  2. Cópielo completo, incluidas la primera y la última línea.
 *  3. Entre a  https://script.google.com  → Proyecto nuevo → borre el contenido
 *     de Código.gs y pegue este archivo.
 *  4. Pegue el bloque del Gem entre las comillas invertidas de la constante
 *     BLOQUE, unas líneas más abajo. No borre las comillas invertidas.
 *  5. Elija la función  crearDocumento  → Ejecutar. Autorice la primera vez.
 *  6. En Ver → Registro de ejecución aparece la liga del documento creado.
 *
 *  El documento queda en su Google Drive, listo para revisar, imprimir o
 *  descargar como Word.
 * ============================================================================
 */

// ============================================================================
//  PEGUE AQUÍ EL BLOQUE DEL GEM  (entre las comillas invertidas)
// ============================================================================

const BLOQUE = `
===PLANEACION-STEAM-V1===
ESCUELA:
CLAVE:
DOCENTE:
NIVEL:
GRADO_GRUPO:
PROYECTO:
FECHA_INICIO:
FECHA_FIN:
SESIONES:
ORGANIZACION:
EJES:
CURRICULO:
STEAM_C:
STEAM_T:
STEAM_I:
STEAM_M:
STEAM_A:
SITUACION:
ODS:
ODS_RELACION:
ACCION_COMUNITARIA:
F1_USUARIO:
F1_PREGUNTAS:
F1_ACTIVIDADES:
F1_REGISTRO:
F1_TIEMPO:
F2_ENUNCIADO:
F2_CONSTRUCCION:
F2_VISIBLE:
F2_TIEMPO:
F3_CONSIGNA:
F3_IDEAS:
F3_CRITERIO:
F3_TIEMPO:
F4_PROTOTIPO:
F4_MATERIALES:
F4_PREGUNTAS:
F4_DOCUMENTACION:
F4_TIEMPO:
F5_PRUEBA:
F5_MEDICION:
F5_PREGUNTAS:
F5_AJUSTE:
F5_TIEMPO:
PRODUCTO:
AUTORIA:
AUDIENCIA:
FORMATO_PITCH:
FECHA_SOCIALIZACION:
EVIDENCIAS:
AJUSTES_ALUMNOS:
RECURSOS:
IA_PROMPT:
IA_ADAPTACION:
NOTA_RUBRICA:
DUA_NOTA:
===FIN===
`;

// ============================================================================
//  DE AQUÍ EN ADELANTE NO HACE FALTA MODIFICAR NADA
// ============================================================================

const VERDE      = '#155E56';
const VERDE_OSC  = '#0E3F3A';
const VERDE_CLA  = '#E3F0EE';
const GRIS       = '#6B7280';
const TINTA      = '#1F2430';
const FILA_ALT   = '#F5FAF9';
const AMBAR_BG   = '#FFF8E8';
const AMBAR_INK  = '#7A5A08';

/** Texto fijo de la fundamentación DUA. Se reproduce al final de toda planeación. */
const TEXTO_DUA = [
  ['Idea central',
   'Un proyecto comunitario y STEAM como «Misión Rescate del Huerto» no necesita agregarse el ' +
   'Diseño Universal para el Aprendizaje por fuera: su propia estructura ya encarna los tres ' +
   'principios de la Guía DUA 3.0.'],
  ['¿Por qué el DUA explica este tipo de proyectos?',
   'La meta del DUA es formar un aprendiz «con propósito y reflexivo, ingenioso y auténtico, ' +
   'estratégico y orientado a la acción». Un huerto escolar cumple esa autenticidad de forma ' +
   'natural: el problema es real —las plantas se marchitan de verdad—, la audiencia es real ' +
   '—la comunidad escolar— y la acción tiene una consecuencia tangible.'],
  ['Empatizar + Definir → Compromiso (el «porqué»)',
   'Ponerse en el lugar del usuario —el niño que riega o no riega— es Compromiso en su forma ' +
   'más pura: antes de resolver algo hay que sentirse parte del problema. Que los niños ' +
   'identifiquen por qué les importa el huerto —«su» planta, «su» espacio— refuerza el sentido ' +
   'de pertenencia que pide este principio.'],
  ['Idear → Representación (el «qué»)',
   'Generar la idea más creativa posible —maceta que «habla», robot que avisa, juego para ' +
   'recordar regar— obliga a explorar el problema desde distintos lenguajes: mecánico, ' +
   'narrativo, lúdico. El carácter STEAM —Ciencia, Tecnología, Ingeniería, Arte, Matemáticas— ' +
   'hace este principio casi automático.'],
  ['Prototipar → Acción y Expresión (el «cómo»)',
   '«No buscamos algo bonito, sino algo que explique cómo funciona la idea» es Acción y ' +
   'Expresión bien entendida: no se evalúa la destreza motriz fina de quien dibuja mejor, sino ' +
   'si logró comunicar su solución. Ofrecer vías equivalentes —dibujo, sketch o actuación, ' +
   'simulación— permite que ningún niño quede fuera por su forma preferida de expresarse.'],
  ['Evaluar → cierre del ciclo',
   '«No es decir si está bien o mal, es ver cómo interactúa el usuario con la idea» encaja con ' +
   'el énfasis de la Guía 3.0 en la autogestión reflexiva del aprendiz: se evalúa el proceso de ' +
   'ajuste, no un resultado fijo.'],
  ['Lo comunitario como amplificador del Compromiso',
   'Un proyecto que sale del salón hacia la escuela o el barrio convierte el sentido de ' +
   'pertenencia en algo verificable: el niño ve el efecto real de su prototipo en una planta, o ' +
   've su cartel pegado en un pasillo real. Esa visibilidad pública conecta identidad, propósito ' +
   'y acción en un solo evento observable.'],
];

function crearDocumento() {
  const datos = parsear(BLOQUE);

  if (!datos.PROYECTO) {
    throw new Error('No se encontró el campo PROYECTO. Verifique que pegó el bloque completo ' +
                    'del Gem entre las comillas invertidas de la constante BLOQUE.');
  }

  const doc  = DocumentApp.create('Planeación STEAM — ' + datos.PROYECTO);
  const body = doc.getBody();
  body.clear();
  body.setMarginTop(50).setMarginBottom(50).setMarginLeft(60).setMarginRight(60);

  // ---------------------------------------------------------------- portada
  parrafo(body, 'PLANEACIÓN DE PROYECTO', { size: 9, bold: true, color: VERDE, space: 2 });
  parrafo(body, datos.PROYECTO, { size: 22, bold: true, color: TINTA, space: 4 });
  parrafo(body, 'Design Thinking en cinco fases · Nueva Escuela Mexicana',
          { size: 11, color: GRIS, space: 10 });

  // --------------------------------------------------- 1 · Identificación
  banda(body, '1', 'IDENTIFICACIÓN DEL PROYECTO');
  tablaCampos(body, [
    ['Escuela y clave', unir(datos.ESCUELA, datos.CLAVE)],
    ['Docente',         datos.DOCENTE],
    ['Nivel y grupo',   unir(datos.NIVEL, datos.GRADO_GRUPO)],
    ['Temporalidad',    fechas(datos.FECHA_INICIO, datos.FECHA_FIN, datos.SESIONES)],
    ['Organización',    datos.ORGANIZACION],
  ]);

  // ------------------------------------------------- 2 · Anclaje curricular
  banda(body, '2', 'ANCLAJE CURRICULAR', 'criterio A2');
  subtitulo(body, 'Ejes articuladores que atraviesan el proyecto');
  lista(body, partir(datos.EJES, '|'));

  subtitulo(body, 'Campos formativos, contenidos y Procesos de Desarrollo de Aprendizaje');
  const filasCur = partir(datos.CURRICULO, ';;').map(f => partir(f, '::'));
  tablaEncabezada(body, ['Campo formativo', 'Contenido', 'PDA que se moviliza'],
                  filasCur.length ? filasCur : [['', '', '']], [130, 170, 200]);
  nota(body, 'Coteje cada PDA con su programa sintético antes de entregar.');

  // ----------------------------------------------------- 3 · Áreas STEAM
  banda(body, '3', 'INTEGRACIÓN DE LAS CINCO ÁREAS STEAM', 'criterio A1');
  tablaEncabezada(body,
    ['Área', 'En este proyecto los alumnos…'],
    [
      ['C · Ciencia — explorar',            datos.STEAM_C],
      ['T · Tecnología — usar herramientas', datos.STEAM_T],
      ['I · Ingeniería — crear soluciones',  datos.STEAM_I],
      ['M · Matemáticas — medir y analizar', datos.STEAM_M],
      ['A · Arte — expresar y construir',    datos.STEAM_A],
    ], [150, 350]);

  // ------------------------------------------- 4 · Problema y comunidad
  banda(body, '4', 'PROBLEMA REAL Y VÍNCULO COMUNITARIO', 'criterio C3');
  subtitulo(body, 'Situación del entorno que motiva el proyecto');
  parrafo(body, datos.SITUACION, { size: 10, space: 6 });
  tablaCampos(body, [
    ['Objetivo de Desarrollo Sostenible', datos.ODS],
    ['Cómo se relaciona',                 datos.ODS_RELACION],
    ['Acción que trasciende el aula',     datos.ACCION_COMUNITARIA],
  ]);

  // ------------------------------------------------------ 5 · Las fases
  banda(body, '5', 'RUTA DEL PROYECTO · LAS CINCO FASES', 'criterios B1 a B5');

  fase(body, '1', 'Empatizar', 'Comprender a los demás y la situación', 'B1', [
    ['¿Quién es el usuario?',   datos.F1_USUARIO],
    ['Preguntas detonadoras',   datos.F1_PREGUNTAS],
    ['Actividades',             datos.F1_ACTIVIDADES],
    ['Registro de evidencia',   datos.F1_REGISTRO],
    ['Tiempo y organización',   datos.F1_TIEMPO],
  ]);

  fase(body, '2', 'Definir', 'Identificar el problema', 'B2', [
    ['Enunciado del problema',       datos.F2_ENUNCIADO],
    ['Cómo se construye con ellos',  datos.F2_CONSTRUCCION],
    ['Dónde quedará visible',        datos.F2_VISIBLE],
    ['Tiempo y organización',        datos.F2_TIEMPO],
  ]);

  fase(body, '3', 'Idear', 'Pensar en soluciones', 'B3', [
    ['Consigna de ideación',   datos.F3_CONSIGNA],
    ['Ideas por equipo',       datos.F3_IDEAS],
    ['Criterio de selección',  datos.F3_CRITERIO],
    ['Tiempo y organización',  datos.F3_TIEMPO],
  ]);

  fase(body, '4', 'Prototipar', 'Crear y construir una solución', 'B4', [
    ['Qué van a construir',      datos.F4_PROTOTIPO],
    ['Materiales',               datos.F4_MATERIALES],
    ['Preguntas guía',           datos.F4_PREGUNTAS],
    ['Cómo se documenta',        datos.F4_DOCUMENTACION],
    ['Tiempo y organización',    datos.F4_TIEMPO],
  ]);

  fase(body, '5', 'Evaluar', 'Ver si funciona', 'B5', [
    ['Cómo se pone a prueba',   datos.F5_PRUEBA],
    ['Qué se mide o cuenta',    datos.F5_MEDICION],
    ['Preguntas de la prueba',  datos.F5_PREGUNTAS],
    ['Registro del ajuste',     datos.F5_AJUSTE],
    ['Tiempo y organización',   datos.F5_TIEMPO],
  ]);

  // ---------------------------------------- 6 · Producto y socialización
  banda(body, '6', 'PRODUCTO Y SOCIALIZACIÓN', 'criterios C1 y C2');
  tablaCampos(body, [
    ['Qué producen',          datos.PRODUCTO],
    ['Quién lo elabora',      datos.AUTORIA],
    ['Ante quién presentan',  datos.AUDIENCIA],
    ['Formato del pitch',     datos.FORMATO_PITCH],
    ['Fecha prevista',        datos.FECHA_SOCIALIZACION],
  ]);

  // ------------------------------------------------------ 7 · Evidencias
  banda(body, '7', 'EVIDENCIAS QUE VOY A RECOLECTAR');
  nota(body, 'Lo que no quedó documentado, para efectos de la valoración, no ocurrió.');
  lista(body, partir(datos.EVIDENCIAS, '|'));

  // -------------------------------------------- 8 · Ajustes y recursos
  banda(body, '8', 'AJUSTES RAZONABLES Y RECURSOS');

  const crudoAjustes = datos.AJUSTES_ALUMNOS || datos.AJUSTES || '';
  const sinAjustes = !crudoAjustes ||
                     /^(sin ajustes|no aplica|ninguno|por definir)/i.test(crudoAjustes.trim());

  subtitulo(body, 'Ajustes razonables previstos');
  if (sinAjustes) {
    nota(body, 'Sin ajustes previstos para este proyecto. Si durante la implementación se ' +
               'identifica que algún alumno requiere apoyo, se registra aquí y se incorpora ' +
               'a la reflexión de cierre.');
  } else {
    const fichas = partir(crudoAjustes, ';;').map(function (f) {
      const c = partir(f, '::');
      return [c[0] || '—', c[1] || '—', c[2] || '—', c[3] || 'Todo el proyecto'];
    });
    tablaEncabezada(body,
      ['Alumno', 'Qué se observa en clase', 'Apoyos acordados', 'Fases'],
      fichas, [90, 150, 190, 90]);
    nota(body, 'Los apoyos responden a lo que se observa en el aula. No constituyen ni ' +
               'requieren diagnóstico alguno.');
  }

  subtitulo(body, 'Recursos y materiales');
  parrafo(body, datos.RECURSOS || '—', { size: 10, space: 6 });

  // -------------------------------------------------------------- 9 · IA
  banda(body, '9', 'APOYO CON INTELIGENCIA ARTIFICIAL', 'criterio D1');
  tablaCampos(body, [
    ['Prompt empleado',            datos.IA_PROMPT],
    ['Qué adapté de la respuesta', datos.IA_ADAPTACION],
  ]);

  // ------------------------------------------------------ 10 · Reflexión
  banda(body, '10', 'REFLEXIÓN AL CIERRE', 'criterio D2');
  nota(body, 'Se llena al terminar la implementación, no al planear.');
  [
    '¿Qué funcionó y qué no? Señale una evidencia concreta que lo demuestre.',
    '¿Qué cambios necesito hacer en mi práctica para integrar mejor las metodologías activas?',
    '¿Qué haré distinto en la próxima implementación?',
  ].forEach((q, i) => {
    parrafo(body, (i + 1) + '. ' + q, { size: 10, bold: true, space: 3 });
    cajaVacia(body);
  });

  // ------------------------------------------------- 11 · Fundamentación DUA
  banda(body, '11', 'FUNDAMENTACIÓN DUA DEL ENFOQUE STEAM Y COMUNITARIO');
  nota(body, 'Base teórica: Guía DUA 3.0 (CAST, 2024) — udlguidelines.cast.org');

  TEXTO_DUA.forEach(function (bloque) {
    parrafo(body, bloque[0], { size: 10, bold: true, color: VERDE_OSC, spaceBefore: 8, space: 2 });
    parrafo(body, bloque[1], { size: 10, color: TINTA, space: 4 });
  });

  subtitulo(body, 'Correspondencia entre las fases y los principios');
  tablaEncabezada(body, ['Fase del proyecto', 'Principio DUA', 'Qué se activa'], [
    ['Empatizar · Definir',        'Compromiso',              'Relevancia, autenticidad, pertenencia, sentido de propósito'],
    ['Idear',                      'Representación',          'Múltiples lenguajes sobre un mismo problema: mecánico, narrativo, lúdico'],
    ['Prototipar',                 'Acción y expresión',      'Vías equivalentes para comunicar la solución, sin privilegiar una destreza'],
    ['Evaluar',                    'Autogestión reflexiva',   'Se valora el proceso de ajuste, no un resultado fijo'],
    ['Socialización comunitaria',  'Compromiso amplificado',  'Pertenencia verificable: el efecto del trabajo se ve en un espacio real'],
  ], [130, 120, 250]);

  parrafo(body, 'Qué implica para la práctica docente', { size: 10, bold: true, color: VERDE_OSC, spaceBefore: 8, space: 2 });
  parrafo(body,
    'No se trata de añadir adaptaciones al final de la planeación, sino de reconocer que un ' +
    'proyecto bien diseñado ya ofrece múltiples puertas de entrada. El trabajo del docente es no ' +
    'cerrarlas: permitir que un alumno explique su prototipo actuando en lugar de escribiendo, o ' +
    'que registre con dibujos en lugar de con texto, no es una concesión, es el diseño ' +
    'funcionando como fue pensado.', { size: 10, space: 6 });

  parrafo(body, 'Nota sobre los niveles educativos', { size: 10, bold: true, color: VERDE_OSC, spaceBefore: 8, space: 2 });
  parrafo(body,
    'En secundaria y preparatoria el DUA no se exige como requisito de la planeación. Planearlo ' +
    'así no representa ningún inconveniente y en este formato ya viene incorporado en la ' +
    'estructura del proyecto: no hay que agregar nada por separado.',
    { size: 10, italic: true, color: GRIS, space: 6 });

  if (datos.DUA_NOTA && datos.DUA_NOTA !== 'No aplica') {
    parrafo(body, 'En este proyecto', { size: 10, bold: true, color: VERDE_OSC, spaceBefore: 8, space: 2 });
    parrafo(body, datos.DUA_NOTA, { size: 10, space: 6 });
  }

  // ------------------------------------------- Observaciones de rúbrica
  if (datos.NOTA_RUBRICA && datos.NOTA_RUBRICA !== 'Sin observaciones') {
    banda(body, '', 'OBSERVACIONES ANTES DE IMPLEMENTAR');
    const t = body.appendTable([[datos.NOTA_RUBRICA]]);
    const c = t.getCell(0, 0);
    c.setBackgroundColor(AMBAR_BG);
    estilo(c.getChild(0).asParagraph(), { size: 10, color: AMBAR_INK });
    sinBordes(t);
  }

  // ---------------------------------------------------------------- firmas
  body.appendParagraph('').appendText('');
  const firmas = body.appendTable([['_______________________________', '_______________________________'],
                                   ['Docente', 'Dirección o mentor pedagógico']]);
  sinBordes(firmas);
  for (let f = 0; f < 2; f++) {
    for (let c = 0; c < 2; c++) {
      estilo(firmas.getCell(f, c).getChild(0).asParagraph(),
             { size: f === 0 ? 10 : 8, color: f === 0 ? TINTA : GRIS, align: 'center' });
    }
  }

  doc.saveAndClose();

  const url = doc.getUrl();
  Logger.log('=======================================================');
  Logger.log('DOCUMENTO CREADO');
  Logger.log(url);
  Logger.log('=======================================================');
  Logger.log('Para tenerlo en Word: Archivo → Descargar → Microsoft Word (.docx)');
  return url;
}

// ============================================================================
//  AUXILIARES
// ============================================================================

/** Convierte el bloque de texto en un objeto {CLAVE: valor}. */
function parsear(texto) {
  const datos = {};
  texto.split('\n').forEach(function (linea) {
    const l = linea.trim();
    if (!l || l.indexOf('===') === 0) return;
    const i = l.indexOf(':');
    if (i < 1) return;
    datos[l.substring(0, i).trim()] = l.substring(i + 1).trim();
  });
  return datos;
}

function partir(valor, sep) {
  if (!valor) return [];
  return valor.split(sep).map(function (s) { return s.trim(); }).filter(function (s) { return s; });
}

function unir() {
  return Array.prototype.slice.call(arguments).filter(function (s) { return s; }).join(' · ');
}

function fechas(ini, fin, ses) {
  let t = '';
  if (ini || fin) t += 'Del ' + (ini || '____') + ' al ' + (fin || '____');
  if (ses) t += (t ? '   ·   ' : '') + ses + ' sesiones';
  return t;
}

function estilo(parrafoObj, o) {
  o = o || {};
  const attrs = {};
  attrs[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  if (o.size)  attrs[DocumentApp.Attribute.FONT_SIZE] = o.size;
  if (o.bold !== undefined) attrs[DocumentApp.Attribute.BOLD] = o.bold;
  if (o.italic !== undefined) attrs[DocumentApp.Attribute.ITALIC] = o.italic;
  if (o.color) attrs[DocumentApp.Attribute.FOREGROUND_COLOR] = o.color;
  attrs[DocumentApp.Attribute.SPACING_BEFORE] = o.spaceBefore || 0;
  attrs[DocumentApp.Attribute.SPACING_AFTER]  = (o.space === undefined ? 4 : o.space);
  attrs[DocumentApp.Attribute.LINE_SPACING]   = 1.15;
  if (o.align === 'center') attrs[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  parrafoObj.setAttributes(attrs);
  return parrafoObj;
}

function parrafo(body, texto, o) {
  return estilo(body.appendParagraph(texto || ''), o);
}

function subtitulo(body, texto) {
  return parrafo(body, texto, { size: 11, bold: true, color: VERDE_OSC, spaceBefore: 10, space: 4 });
}

function nota(body, texto) {
  return parrafo(body, texto, { size: 9, italic: true, color: GRIS, space: 6 });
}

/** Banda de sección con fondo verde. */
function banda(body, numero, titulo, etiqueta) {
  const texto = (numero ? numero + '   ' : '') + titulo + (etiqueta ? '        → ' + etiqueta : '');
  const t = body.appendTable([[texto]]);
  const c = t.getCell(0, 0);
  c.setBackgroundColor(VERDE);
  c.setPaddingTop(4).setPaddingBottom(4).setPaddingLeft(8).setPaddingRight(8);
  estilo(c.getChild(0).asParagraph(), { size: 11, bold: true, color: '#FFFFFF', space: 0 });
  sinBordes(t);
  return t;
}

/** Encabezado de una fase. */
function fase(body, numero, nombre, lema, criterio, campos) {
  const t = body.appendTable([[numero, nombre + '  —  ' + lema, 'CRITERIO ' + criterio]]);
  t.getCell(0, 0).setBackgroundColor(VERDE_OSC).setWidth(40);
  t.getCell(0, 1).setBackgroundColor(VERDE);
  t.getCell(0, 2).setBackgroundColor(VERDE).setWidth(100);
  estilo(t.getCell(0, 0).getChild(0).asParagraph(), { size: 16, bold: true, color: '#FFFFFF', space: 0, align: 'center' });
  estilo(t.getCell(0, 1).getChild(0).asParagraph(), { size: 12, bold: true, color: '#FFFFFF', space: 0 });
  estilo(t.getCell(0, 2).getChild(0).asParagraph(), { size: 8,  bold: true, color: '#BFE0DB', space: 0, align: 'center' });
  sinBordes(t);
  tablaCampos(body, campos, 150);
}

/** Tabla de dos columnas: etiqueta con fondo claro, valor en blanco. */
function tablaCampos(body, filas, anchoEtiqueta) {
  const datos = filas.map(function (f) { return [f[0], f[1] || '—']; });
  const t = body.appendTable(datos);
  for (let i = 0; i < datos.length; i++) {
    const a = t.getCell(i, 0), b = t.getCell(i, 1);
    a.setBackgroundColor(VERDE_CLA).setWidth(anchoEtiqueta || 140);
    a.setPaddingTop(4).setPaddingBottom(4);
    b.setPaddingTop(4).setPaddingBottom(4);
    estilo(a.getChild(0).asParagraph(), { size: 9, bold: true, color: VERDE, space: 0 });
    estilo(b.getChild(0).asParagraph(), { size: 10, color: TINTA, space: 0 });
  }
  bordesSuaves(t);
  return t;
}

/** Tabla con fila de encabezado verde. */
function tablaEncabezada(body, encabezados, filas, anchos) {
  const datos = [encabezados].concat(filas.map(function (f) {
    return encabezados.map(function (_, i) { return (f[i] || '—'); });
  }));
  const t = body.appendTable(datos);
  for (let c = 0; c < encabezados.length; c++) {
    const celda = t.getCell(0, c);
    celda.setBackgroundColor(VERDE);
    if (anchos && anchos[c]) celda.setWidth(anchos[c]);
    estilo(celda.getChild(0).asParagraph(), { size: 9, bold: true, color: '#FFFFFF', space: 0 });
  }
  for (let f = 1; f < datos.length; f++) {
    for (let c = 0; c < encabezados.length; c++) {
      const celda = t.getCell(f, c);
      if (f % 2 === 1) celda.setBackgroundColor(FILA_ALT);
      celda.setPaddingTop(4).setPaddingBottom(4);
      estilo(celda.getChild(0).asParagraph(), { size: 10, color: TINTA, space: 0 });
    }
  }
  bordesSuaves(t);
  return t;
}

function lista(body, elementos) {
  if (!elementos.length) { nota(body, 'Por definir.'); return; }
  elementos.forEach(function (e) {
    const p = body.appendListItem(e).setGlyphType(DocumentApp.GlyphType.BULLET);
    estilo(p, { size: 10, space: 2 });
  });
  body.appendParagraph('').setAttributes(
    (function () { const a = {}; a[DocumentApp.Attribute.FONT_SIZE] = 4; return a; })()
  );
}

function cajaVacia(body) {
  const t = body.appendTable([['']]);
  t.getCell(0, 0).setPaddingTop(14).setPaddingBottom(14);
  bordesSuaves(t);
  return t;
}

function bordesSuaves(t) {
  t.setBorderColor('#CFDEDB');
  t.setBorderWidth(0.5);
}

function sinBordes(t) {
  t.setBorderWidth(0);
}

/**
 * ============================================================================
 *  LICENCIA Y CRÉDITOS
 * ============================================================================
 *  Kit STEAM — Versión 1.0 · Septiembre de 2026
 *
 *  Diseño y desarrollo:    Dr. Emmanuelle Ruelas Gómez
 *  Contenido pedagógico:   Dr. Emmanuelle Ruelas Gómez, Ing. Daniel Millan Alcantara, Mtra. Emarinia Angulo Camacho, Mtra. Miriam Melero Hernández
 *  Revisión y validación:  Dr. Juan Terrazas Gaynor
 *  Gestión y eventos:      Ing. Daniel Millan Alcantara, Dra. Verónica Rojas Mendizábal
 *  Institución:            CETYS - Universidad
 *  Contacto:               emmanuelle.ruelas@cetys.mx
 *
 *  Licencia Creative Commons Atribución-CompartirIgual 4.0 Internacional
 *  (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/deed.es
 *
 *  Puede compartirse y adaptarse, incluso con fines comerciales, siempre que
 *  se dé crédito, se indique si hubo cambios y las obras derivadas se
 *  distribuyan bajo esta misma licencia.
 *
 *  Cómo citar: Ruelas Gómez, E. (2026). Kit STEAM para
 *  el diseño de proyectos de aula. Versión 1.0. CC BY-SA 4.0.
 * ============================================================================
 */
