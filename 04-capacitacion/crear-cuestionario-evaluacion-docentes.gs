/**
 * ============================================================================
 *  CUESTIONARIO DE EVALUACIÓN PARA DOCENTES
 *  Planeación Inclusiva con IA y Design Thinking
 *  Generador de Google Forms
 * ============================================================================
 *
 *  CÓMO USARLO
 *  1. Entre a  https://script.google.com  con la cuenta donde debe vivir el
 *     formulario (la institucional, si el formulario es de la Secretaría).
 *  2. Proyecto nuevo  →  borre el contenido de Código.gs  →  pegue este archivo.
 *  3. Guarde. En el selector de funciones elija  crearCuestionarioEvaluacionDocentes
 *     →  Ejecutar.
 *  4. La primera vez Google pedirá autorización: Revisar permisos → su cuenta →
 *     Configuración avanzada → Ir a (nombre del proyecto) → Permitir.
 *  5. Al terminar, abra  Ver → Registro de ejecución  (o Ctrl+Enter): ahí
 *     aparecen la liga de edición y la liga para responder.
 *
 *  El script tarda unos 10 segundos. Cada ejecución crea un formulario NUEVO;
 *  no modifica los anteriores.
 * ============================================================================
 */

function crearCuestionarioEvaluacionDocentes() {

  // ---------------------------------------------------------------- FORMULARIO
  var form = FormApp.create('Cuestionario de Evaluación para Docentes: Planeación Inclusiva con IA y Design Thinking')
    .setTitle('Cuestionario de Evaluación para Docentes')
    .setDescription(
      'Planeación Inclusiva con IA y Design Thinking\n\n' +
      'Este cuestionario mide su experiencia con la Gema de Gemini y el enfoque de Design ' +
      'Thinking trabajados durante la capacitación, así como su intención de aplicarlos en el aula.\n\n' +
      'ESCALA DE RESPUESTA — Likert de 5 puntos:\n' +
      '1: Totalmente en desacuerdo   2: En desacuerdo   3: Neutral / Indeciso   ' +
      '4: De acuerdo   5: Totalmente de acuerdo\n\n' +
      'No hay respuestas correctas o incorrectas; responda según su experiencia real durante ' +
      'el taller y en su práctica docente.'
    )
    .setCollectEmail(false)
    .setProgressBar(true)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false);

  // ------------------------------------------------------- utilitarios internos

  var ETIQUETA_BAJA = 'Totalmente en desacuerdo';
  var ETIQUETA_ALTA = 'Totalmente de acuerdo';

  /** Crea un reactivo Likert de 5 puntos. */
  function likert(numero, texto) {
    form.addScaleItem()
      .setTitle(numero + '. ' + texto)
      .setBounds(1, 5)
      .setLabels(ETIQUETA_BAJA, ETIQUETA_ALTA)
      .setRequired(true);
  }

  /** Encabezado de bloque, con su objetivo de medición. */
  function bloque(numero, titulo, objetivo) {
    form.addSectionHeaderItem()
      .setTitle('BLOQUE ' + numero + ' · ' + titulo.toUpperCase())
      .setHelpText('Objetivo: ' + objetivo);
  }

  // ==========================================================================
  //  DATOS DE IDENTIFICACIÓN (opcionales, para dar contexto a las respuestas)
  // ==========================================================================

  form.addMultipleChoiceItem()
    .setTitle('Nivel educativo en el que imparte clase')
    .setChoiceValues(['Preescolar', 'Primaria', 'Secundaria', 'Preparatoria'])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Escuela')
    .setRequired(false);

  // ==========================================================================
  //  BLOQUE 1 · INTEGRACIÓN TECNOLÓGICA Y AUTOEFICACIA CON LA GEMA DE GEMINI
  // ==========================================================================

  bloque(1, 'Integración Tecnológica y Autoeficacia con la Gema de Gemini',
    'Medir la confianza del profesor para interactuar con la IA en la labor docente.');

  likert(1, 'Me siento capaz de escribir instrucciones (prompts) claras a la Gema de Gemini ' +
    'para estructurar secuencias didácticas acordes a mi asignatura.');
  likert(2, 'Logro utilizar la Gema como un asistente que optimiza el tiempo dedicado al ' +
    'diseño y rediseño de mis planeaciones de clase.');
  likert(3, 'Confío en mi capacidad para evaluar críticamente las propuestas didácticas ' +
    'generadas por la Gema y ajustarlas a las necesidades de mi contexto escolar.');

  // ==========================================================================
  //  BLOQUE 2 · APLICACIÓN DEL DESIGN THINKING EN LA PLANEACIÓN DIDÁCTICA
  // ==========================================================================

  bloque(2, 'Aplicación del Design Thinking en la Planeación Didáctica',
    'Medir la adopción de las fases del pensamiento de diseño para estructurar el aprendizaje.');

  likert(4, 'Utilizo la Gema para indagar y comprender mejor las fortalezas, intereses y ' +
    'estilos de aprendizaje de mis estudiantes antes de redactar la planeación.');
  likert(5, 'Logro delimitar con claridad las necesidades educativas y el problema central ' +
    'que abordará la secuencia didáctica.');
  likert(6, 'Aprovecho la Gema para generar alternativas creativas y "prototipar" actividades ' +
    'de aprendizaje centradas en el estudiante.');
  likert(7, 'Concibo la planeación como un prototipo flexible que requiere ajustes continuos ' +
    'según la respuesta de los estudiantes en el aula.');

  // ==========================================================================
  //  BLOQUE 3 · INCLUSIÓN EDUCATIVA, DUA Y ATENCIÓN A LA DIVERSIDAD
  // ==========================================================================

  bloque(3, 'Inclusión Educativa, DUA y Atención a la Diversidad',
    'Medir la capacidad de diseñar estrategias para barreras del aprendizaje (BAP) y ' +
    'diversidad en el aula.');

  likert(8, 'Utilizo la Gema de Gemini para incorporar pautas del Diseño Universal para el ' +
    'Aprendizaje (DUA), ofreciendo múltiples formas de representación, expresión y motivación.');
  likert(9, 'Puedo solicitar a la Gema ajustes y adaptaciones específicas para estudiantes con ' +
    'Barreras para el Aprendizaje y la Participación (BAP) o necesidades educativas diversas.');
  likert(10, 'El enfoque de Design Thinking me ayuda a ponerme en el lugar de los estudiantes ' +
    'con mayores dificultades de aprendizaje para diseñar actividades accesibles para todos.');
  likert(11, 'Mis planeaciones diseñadas con la Gema garantizan que todo el alumnado, sin ' +
    'importar su condición o ritmo, participe activamente en el proceso.');

  // ==========================================================================
  //  BLOQUE 4 · COMPROMISO, VIVENCIA Y TRANSFERENCIA AL AULA
  // ==========================================================================

  bloque(4, 'Compromiso, Vivencia y Transferencia al Aula',
    'Medir la inmersión en la capacitación y la intención de aplicar lo aprendido en la ' +
    'práctica real.');

  likert(12, 'Intento integrar activamente el pensamiento de diseño y la Gema para resolver ' +
    'retos reales en mi enseñanza diaria.');
  likert(13, 'Durante el taller, estuve completamente involucrado/a y enfocado/a en explorar ' +
    'el potencial transformador de estas herramientas para mi labor.');
  likert(14, 'Siento el deseo y la capacidad de enseñar a otros colegas cómo utilizar la Gema ' +
    'y el Design Thinking para crear planeaciones inclusivas.');
  likert(15, 'Tengo el compromiso de implementar en el aula las planeaciones inclusivas ' +
    'desarrolladas durante esta capacitación.');

  // ==========================================================================
  //  CIERRE
  // ==========================================================================

  form.addParagraphTextItem()
    .setTitle('Comentarios adicionales')
    .setHelpText('Opcional. Algo que quiera agregar sobre la Gema, el enfoque de Design ' +
                 'Thinking o el taller en general.')
    .setRequired(false);

  form.setConfirmationMessage('Gracias por responder. Sus respuestas ayudan a mejorar la capacitación.');

  // -------------------------------------------------------------------- SALIDA
  var edicion   = form.getEditUrl();
  var respuesta = form.getPublishedUrl();

  Logger.log('=======================================================');
  Logger.log('FORMULARIO CREADO');
  Logger.log('Editar:     ' + edicion);
  Logger.log('Responder:  ' + respuesta);
  Logger.log('=======================================================');
  Logger.log('Las respuestas de escala (1-5) pueden promediarse por bloque directamente en ');
  Logger.log('la hoja de cálculo vinculada (Respuestas → Vincular a Hojas de cálculo), con');
  Logger.log('=PROMEDIO() sobre las columnas de cada bloque.');

  return { editar: edicion, responder: respuesta };
}

/**
 * ============================================================================
 *  LICENCIA Y CRÉDITOS
 * ============================================================================
 *  Kit STEAM — Versión 1.0 · Septiembre de 2026
 *
 *  Diseño y desarrollo:    Dr. Emmanuelle Ruelas Gómez
 *  Contenido pedagógico:   Dr. Emmanuelle Ruelas Gómez, Ing. Daniel Millan Coronado, Mtra. Emarinia Angulo Camacho, Mtra. Miriam Melero Hernández, Dra. Silvia Lizeth Becerra Rojas, M en C. Maritza Patricia López Solorio
 *  Revisión y validación:  Dr. Juan Terrazas Gaynor
 *  Gestión y eventos:      Ing. Daniel Millan Coronado, Dra. Verónica Rojas Mendizábal
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
