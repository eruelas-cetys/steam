/**
 * ============================================================================
 *  RÚBRICA DE VALORACIÓN DE TRANSFERENCIA STEAM
 *  Generador de Google Forms
 * ============================================================================
 *
 *  CÓMO USARLO
 *  1. Entre a  https://script.google.com  con la cuenta donde debe vivir el
 *     formulario (la institucional, si el formulario es de la Secretaría).
 *  2. Proyecto nuevo  →  borre el contenido de Código.gs  →  pegue este archivo.
 *  3. Guarde. En el selector de funciones elija  crearRubricaSTEAM  →  Ejecutar.
 *  4. La primera vez Google pedirá autorización: Revisar permisos → su cuenta →
 *     Configuración avanzada → Ir a (nombre del proyecto) → Permitir.
 *  5. Al terminar, abra  Ver → Registro de ejecución  (o Ctrl+Enter): ahí
 *     aparecen la liga de edición y la liga para responder.
 *
 *  El script tarda entre 20 y 40 segundos. Es idempotente en el sentido de que
 *  cada ejecución crea un formulario NUEVO; no modifica los anteriores.
 * ============================================================================
 */

function crearRubricaSTEAM() {

  // ---------------------------------------------------------------- FORMULARIO
  var form = FormApp.create('Rúbrica de Valoración de Transferencia STEAM')
    .setTitle('Rúbrica de Valoración de Transferencia STEAM')
    .setDescription(
      'Evidencia de aplicación del Taller Docente STEAM en un proyecto de aula.\n\n' +
      'QUÉ MIDE. Si los contenidos impartidos en el taller —enfoque STEAM integrado, ' +
      'metodologías activas de la NEM, prototipado de baja fidelidad, socialización tipo pitch, ' +
      'proyectos comunitarios con Agenda 2030 y planeación asistida con IA— fueron efectivamente ' +
      'incorporados a un proyecto implementado con alumnos.\n\n' +
      'QUIÉN LA APLICA. Observador externo, mentor pedagógico o moderador del colectivo escolar.\n\n' +
      'SOBRE QUÉ SE APLICA. El proyecto y sus evidencias: planeación, productos de los alumnos, ' +
      'registro fotográfico o audiovisual y reflexión del docente. No requiere presencia en el aula.\n\n' +
      'REGLA DE DECISIÓN. Asigne el nivel solo con evidencia documental a la vista. Si un criterio ' +
      'no puede sustentarse en un producto o registro, corresponde nivel 1, no un juicio de intención.'
    )
    .setCollectEmail(false)
    .setProgressBar(true)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false);

  // ------------------------------------------------------- utilitarios internos

  /** Crea un reactivo de criterio con sus cuatro niveles. */
  function criterio(codigo, titulo, cita, niveles, evidencia, incluirNA) {
    var ayuda = '';
    if (cita) ayuda += cita + '\n\n';
    ayuda += 'EVIDENCIA ESPERADA: ' + evidencia;

    var item = form.addMultipleChoiceItem()
      .setTitle(codigo + '. ' + titulo)
      .setHelpText(ayuda)
      .setRequired(true);

    var opciones = [
      '4 · Consolidado — ' + niveles[4],
      '3 · Competente — ' + niveles[3],
      '2 · En desarrollo — ' + niveles[2],
      '1 · Inicial — ' + niveles[1],
    ];
    if (incluirNA) opciones.push('N/A · El docente optó por no emplear IA (se descuenta del total)');

    item.setChoiceValues(opciones);
    return item;
  }

  /** Encabezado de bloque. */
  function bloque(letra, titulo, subtitulo) {
    form.addSectionHeaderItem()
      .setTitle('BLOQUE ' + letra + ' · ' + titulo.toUpperCase())
      .setHelpText(subtitulo);
  }

  /** Salto de página. */
  function pagina(titulo, descripcion) {
    return form.addPageBreakItem().setTitle(titulo).setHelpText(descripcion || '');
  }

  // ==========================================================================
  //  PÁGINA 1 · DATOS DE IDENTIFICACIÓN
  // ==========================================================================

  form.addListItem()
    .setTitle('Nivel educativo')
    .setChoiceValues(['Preescolar', 'Primaria', 'Secundaria', 'Preparatoria'])
    .setRequired(true);

  form.addTextItem().setTitle('Nombre del docente').setRequired(true);
  form.addTextItem().setTitle('Escuela y clave').setRequired(true);
  form.addTextItem().setTitle('Grado y grupo').setRequired(false);
  form.addTextItem().setTitle('Nombre del proyecto').setRequired(true);

  form.addDateItem().setTitle('Fecha de la valoración').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Metodología activa empleada por el docente')
    .setHelpText('Si empleó Aprendizaje Basado en Juego, valore el Bloque B con la tabla de ' +
                 'equivalencias del Anexo 1 de la rúbrica impresa.')
    .setChoiceValues(['Design Thinking', 'Aprendizaje Basado en Juego', 'Ambas'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Evidencias entregadas')
    .setHelpText('Marque todo lo que el docente puso a disposición para esta valoración.')
    .setChoiceValues([
      'Planeación escrita',
      'Fotografías del proceso',
      'Prototipos o productos de los alumnos',
      'Video del pitch o de la socialización',
      'Bitácora o registros de los alumnos',
      'Reflexión docente',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Agente observador')
    .setChoiceValues([
      'Observador externo',
      'Mentor pedagógico o moderador del colectivo escolar',
    ])
    .setRequired(true);

  form.addTextItem().setTitle('Nombre del observador').setRequired(true);

  // ==========================================================================
  //  PÁGINA 2 · BLOQUE A
  // ==========================================================================

  pagina('Bloque A · Fundamentación del enfoque',
         'Dos criterios. ¿El proyecto es STEAM y está anclado al currículo?\n\n' +
         'ESCALA — 4 Consolidado: evidencia sólida y consistente, el rasgo aparece completo. ' +
         '3 Competente: evidencia adecuada y funcional, con limitaciones menores. ' +
         '2 En desarrollo: evidencia parcial, superficial o inconsistente. ' +
         '1 Inicial: evidencia mínima o ausente.');

  criterio('A1', 'Integración auténtica de las cinco áreas STEAM',
    'Contenido del taller: «STEAM no se enseña por separado, se vive de forma integrada». ' +
    'Ciencia (explorar), Tecnología (usar herramientas), Ingeniería (crear soluciones), ' +
    'Matemáticas (medir y analizar), Arte (expresar y construir).',
    {
      4: 'Las cinco áreas se integran en una misma experiencia; el Arte funciona como vehículo de expresión y de cambio, no como decorado. Se distingue con claridad qué se explora, con qué herramientas, qué se construye, qué se mide y cómo se expresa.',
      3: 'Se integran al menos cuatro áreas de forma articulada dentro del mismo proyecto.',
      2: 'Aparecen dos o tres áreas, o bien las cinco pero en actividades separadas y sin conexión entre sí.',
      1: 'El proyecto es monodisciplinar; el rótulo «STEAM» no se sostiene en las actividades.',
    },
    'planeación y secuencia de actividades.');

  criterio('A2', 'Anclaje curricular en la Nueva Escuela Mexicana',
    'Estructura del plan de referencia: ejes articuladores, campos formativos, contenidos y ' +
    'Procesos de Desarrollo de Aprendizaje (PDA).',
    {
      4: 'Declara ejes articuladores, campos formativos, contenidos y PDA, y las actividades corresponden efectivamente a los PDA declarados.',
      3: 'Declara los cuatro elementos; la correspondencia con las actividades es mayormente adecuada.',
      2: 'Declara algunos elementos de forma genérica o copiada, con correspondencia débil.',
      1: 'No hay anclaje curricular explícito.',
    },
    'encabezado y cuerpo de la planeación.');

  // ==========================================================================
  //  PÁGINA 3 · BLOQUE B
  // ==========================================================================

  pagina('Bloque B · Proceso de diseño',
         'Cinco criterios. Corresponden a las etapas que los docentes vivieron en la actividad ' +
         '«Misión Rescate del Huerto» durante el taller.');

  criterio('B1', 'Empatizar — el usuario está identificado',
    '«Es importante pensar en el niño como el usuario.»',
    {
      4: 'El proyecto identifica explícitamente a quién afecta el problema y recoge su voz o su emoción: entrevistas, dibujos, diálogo registrado, encuesta al grupo o a la comunidad.',
      3: 'Identifica al usuario y explora sus necesidades, aunque el recojo sea informal.',
      2: 'Menciona al usuario sin indagar sobre él; se asume lo que necesita.',
      1: 'No hay usuario; se parte directamente del contenido o del objeto.',
    },
    'registro de saberes previos, diálogos, dibujos o entrevistas.');

  criterio('B2', 'Definir — el problema está formulado por el grupo',
    'Producto del taller: «Nuestro problema es: ______».',
    {
      4: 'Existe un enunciado de problema redactado con el grupo, específico, en lenguaje de los alumnos, y visible durante el proyecto (cartel, pizarrón, bitácora).',
      3: 'Existe un enunciado claro del problema, formulado principalmente por el docente con aportación de los alumnos.',
      2: 'El problema es genérico o está implícito en el tema.',
      1: 'No se formula problema alguno.',
    },
    'enunciado escrito o fotografiado.');

  criterio('B3', 'Idear — se generaron múltiples soluciones',
    '«Generar la idea más creativa posible. Entre más divertida y adecuada para el usuario, mejor.»',
    {
      4: 'Hay registro de varias ideas distintas por equipo y un criterio explícito para elegir la que se prototipó.',
      3: 'Hay registro de varias ideas; la selección no está documentada.',
      2: 'Se registra una sola idea, o las ideas provienen del docente.',
      1: 'No hay fase de ideación; se pasó directo a ejecutar una consigna.',
    },
    'lluvia de ideas, dibujos, listas, fotografías del pizarrón.');

  criterio('B4', 'Prototipar — baja fidelidad que explica el funcionamiento',
    '«No buscamos algo bonito, sino algo que explique cómo funciona la idea.»',
    {
      4: 'Existe un prototipo de baja fidelidad —dibujo, maqueta con material reciclado, sketch actuado o simulación— construido por los alumnos, que explica cómo funciona la solución: qué partes tiene, qué hace el usuario y qué hace el sistema.',
      3: 'Existe prototipo construido por los alumnos, aunque no alcanza a explicar el funcionamiento completo.',
      2: 'El producto es principalmente decorativo, o fue elaborado por el docente o las familias.',
      1: 'No hay prototipo.',
    },
    'fotografías de los prototipos y del proceso de construcción.');

  criterio('B5', 'Evaluar — se probó, se midió y se ajustó',
    '«No es decir si está bien o mal, es ver cómo interactúa el usuario con la idea.»',
    {
      4: 'El prototipo se puso a prueba con el usuario, se registró qué ocurrió y hay evidencia de al menos un ajuste derivado de esa prueba.',
      3: 'Hubo prueba y registro; el ajuste es incipiente o solo verbal.',
      2: 'Hubo presentación del producto pero no prueba real; la evaluación se limitó a valorar el resultado.',
      1: 'No hay fase de evaluación ni iteración.',
    },
    'registro de la prueba, versión inicial y versión ajustada.');

  // ==========================================================================
  //  PÁGINA 4 · BLOQUE C
  // ==========================================================================

  pagina('Bloque C · Producto, socialización y comunidad',
         'Tres criterios. Para C1 tome como referencia la tabla de concreción por nivel ' +
         'educativo (Anexo 2 de la rúbrica impresa).');

  criterio('C1', 'Pertinencia del producto al nivel educativo',
    'Referencia — Preescolar: dibujo, maqueta con material reciclado, escena actuada o simulación. ' +
    'Primaria: maqueta funcional simple o prototipo que muestra partes y funcionamiento. ' +
    'Secundaria: prototipo funcional o modelo a escala, con medición y datos. ' +
    'Preparatoria: prototipo iterado con validación de usuario y análisis de viabilidad.',
    {
      4: 'El producto corresponde con precisión a lo esperado para el nivel: exigencia cognitiva adecuada, autoría real de los alumnos y complejidad acorde a la edad.',
      3: 'El producto es adecuado al nivel, con exigencia ligeramente por debajo o por encima de lo esperado.',
      2: 'El producto está claramente por debajo del nivel, o excede lo que los alumnos pueden haber hecho por sí mismos.',
      1: 'No hay producto identificable de los alumnos.',
    },
    'productos físicos o su registro fotográfico, contrastados con la tabla por nivel.');

  criterio('C2', 'Socialización de la solución',
    'Del taller: presentación rápida tipo pitch — «Nuestra solución es…».',
    {
      4: 'Los alumnos presentan su solución a una audiencia real —otro grupo, la escuela, las familias, la comunidad— explicando el problema, la idea y su funcionamiento.',
      3: 'Los alumnos presentan su solución dentro del propio grupo.',
      2: 'El docente expone el trabajo por los alumnos, o la socialización se reduce a exhibir productos sin explicación.',
      1: 'No hubo socialización.',
    },
    'video, fotografías del acto de presentación, guion o carteles.');

  criterio('C3', 'Vínculo comunitario y Agenda 2030',
    '«Idealmente los proyectos deben atender una problemática o tema en el marco de la ' +
    'Agenda 2030 de la ONU.»',
    {
      4: 'El proyecto parte de una problemática real del entorno, se vincula explícitamente con un Objetivo de Desarrollo Sostenible y genera una acción que trasciende el aula.',
      3: 'Parte de una problemática real del entorno y se relaciona con un ODS, aunque la acción no salga del aula.',
      2: 'El tema es de interés general pero no está anclado al contexto de la escuela ni a un ODS.',
      1: 'El proyecto es un ejercicio escolar sin referencia al entorno.',
    },
    'justificación del proyecto y evidencia de la acción comunitaria.');

  // ==========================================================================
  //  PÁGINA 5 · BLOQUE D
  // ==========================================================================

  pagina('Bloque D · Herramientas y mejora continua', 'Dos criterios.');

  criterio('D1', 'Planeación asistida con Inteligencia Artificial',
    'Del taller: estructura de prompt Rol + Contexto + Tarea + Formato, aplicada a planeación, ' +
    'adaptación de actividades, integración STEAM y creación de materiales.',
    {
      4: 'Documenta el uso de IA con prompt estructurado (rol, contexto, tarea, formato) y evidencia de que revisó y adaptó críticamente la salida a su grupo y contexto.',
      3: 'Documenta el uso de IA con prompt razonable y alguna adaptación.',
      2: 'Usó IA de forma incidental, o incorporó el resultado sin revisión ni adaptación.',
      1: 'No hay evidencia de uso de la herramienta.',
    },
    'captura del prompt, material generado y versión adaptada.',
    true /* incluye opción N/A */);

  criterio('D2', 'Reflexión docente y mejora continua',
    'Preguntas de cierre del taller: adaptación al contexto, cambios en la práctica, ' +
    'habilidades a fortalecer.',
    {
      4: 'El docente documenta qué funcionó, qué no y qué cambiará en su próxima intervención, con referencia a evidencias concretas del proyecto.',
      3: 'Documenta una reflexión pertinente sobre su práctica.',
      2: 'La reflexión es general, o se limita a valorar el ánimo de los alumnos.',
      1: 'No hay reflexión documentada.',
    },
    'escrito de cierre, bitácora docente, participación en el colectivo escolar.');

  // ==========================================================================
  //  PÁGINA 6 · CIERRE
  // ==========================================================================

  pagina('Cierre de la valoración', '');

  form.addParagraphTextItem()
    .setTitle('Evidencia narrativa del observador')
    .setHelpText('Registre hechos, no juicios. Cite el producto o el registro concreto que ' +
                 'sustenta sus valoraciones más altas y más bajas, y señale un aspecto con mayor ' +
                 'potencial de mejora para la siguiente implementación.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Fortaleza más notable del proyecto')
    .setHelpText('Una o dos líneas. Sirve para identificar proyectos que puedan documentarse como ' +
                 'referente para el colectivo escolar.')
    .setRequired(false);

  form.addSectionHeaderItem()
    .setTitle('Sobre el puntaje')
    .setHelpText(
      'El puntaje se calcula automáticamente en la hoja de respuestas.\n\n' +
      '43–48  Transferencia consolidada.  33–42  Transferencia competente.  ' +
      '22–32  Transferencia en desarrollo.  12–21  Transferencia inicial.\n\n' +
      'Si D1 se marcó N/A, el máximo es 44 y los cortes se recalculan proporcionalmente ' +
      '(90 % / 68 % / 45 %).\n\n' +
      'El puntaje orienta la conversación formativa y la mejora del propio taller; ' +
      'no clasifica al docente.'
    );

  form.setConfirmationMessage(
    'Valoración registrada. Gracias.\n\n' +
    'Recuerde que este instrumento también evalúa al taller: un criterio en el que la mayoría ' +
    'de los docentes obtenga 1 o 2 señala una falla de la capacitación, no del grupo.'
  );

  // -------------------------------------------------------------------- SALIDA
  var edicion   = form.getEditUrl();
  var respuesta = form.getPublishedUrl();

  Logger.log('=======================================================');
  Logger.log('FORMULARIO CREADO');
  Logger.log('Editar:     ' + edicion);
  Logger.log('Responder:  ' + respuesta);
  Logger.log('=======================================================');
  Logger.log('SIGUIENTE PASO — puntaje automático:');
  Logger.log('En el formulario, pestaña Respuestas → Vincular a Hojas de cálculo.');
  Logger.log('En la hoja, ejecute una vez la función  agregarColumnaPuntaje()  de este');
  Logger.log('mismo proyecto, o pegue a mano la fórmula que aparece en el comentario final.');

  return { editar: edicion, responder: respuesta };
}


/**
 * ============================================================================
 *  PUNTAJE AUTOMÁTICO EN LA HOJA DE RESPUESTAS
 * ============================================================================
 *  Cada opción de los doce criterios empieza con su número ("4 · Consolidado — …"),
 *  de modo que el puntaje se obtiene leyendo el primer carácter de cada respuesta.
 *
 *  Opción A — a mano. En la hoja de respuestas, en la primera celda libre de la
 *  fila 1 escriba el encabezado "Puntaje" y en la fila 2:
 *
 *      =SUMAPRODUCTO(SI.ERROR(VALOR(IZQUIERDA(K2:V2;1));0))
 *
 *  ajustando K:V al rango real de las doce columnas de criterios (A1 … D2).
 *  Las respuestas N/A no empiezan con dígito, así que suman cero por sí solas.
 *
 *  Opción B — automática. Abra la hoja vinculada, entre a Extensiones → Apps
 *  Script, pegue esta función y ejecútela una vez.
 * ============================================================================
 */
function agregarColumnaPuntaje() {
  var hoja = SpreadsheetApp.getActiveSheet();
  var encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

  // Localiza las columnas cuyo encabezado empieza con el código del criterio.
  var codigos = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'D1', 'D2'];
  var columnas = [];
  codigos.forEach(function (c) {
    for (var i = 0; i < encabezados.length; i++) {
      if (String(encabezados[i]).indexOf(c + '.') === 0) { columnas.push(i + 1); break; }
    }
  });

  if (columnas.length !== 12) {
    throw new Error('Se encontraron ' + columnas.length + ' de 12 columnas de criterios. ' +
                    'Verifique que la hoja corresponda a este formulario.');
  }

  var destino = hoja.getLastColumn() + 1;
  hoja.getRange(1, destino).setValue('Puntaje').setFontWeight('bold');
  hoja.getRange(1, destino + 1).setValue('Interpretación').setFontWeight('bold');

  var refs = columnas.map(function (col) {
    return 'IFERROR(VALUE(LEFT(' + columnaLetra(col) + '2,1)),0)';
  }).join('+');

  hoja.getRange(2, destino).setFormula('=' + refs);
  hoja.getRange(2, destino + 1).setFormula(
    '=IF(' + columnaLetra(destino) + '2="","",' +
    'IFS(' + columnaLetra(destino) + '2>=43,"Consolidada",' +
    columnaLetra(destino) + '2>=33,"Competente",' +
    columnaLetra(destino) + '2>=22,"En desarrollo",TRUE,"Inicial"))'
  );

  SpreadsheetApp.getUi().alert(
    'Listo. Se agregaron las columnas "Puntaje" e "Interpretación" en la fila 2.\n\n' +
    'Copie ambas celdas hacia abajo, o arrastre el controlador de relleno, para que ' +
    'apliquen a las respuestas siguientes.'
  );
}

/** Convierte un número de columna en su letra (1 → A, 27 → AA). */
function columnaLetra(n) {
  var s = '';
  while (n > 0) {
    var r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
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
