/*
  Pasos (cápsulas) de cada módulo. Cada paso se hace en 5 a 10 minutos:
  qué va a lograr → cómo se hace → practíquelo → "lo logré" o "necesito ayuda".
  El texto está escrito para leerse en voz alta si hace falta: frases cortas,
  sin siglas, con el nombre de las cosas tal como se ven en la pantalla.
*/
import type { ClaveIlustracion } from "@/components/Ilustracion";

export type Paso = {
  id: string;
  titulo: string;
  lograra: string;            // "Al terminar este paso podrá…"
  como: string[];             // instrucciones, una por línea
  ilustracion: ClaveIlustracion;
  practica: string;           // lo que el docente hace ahora mismo
  siSeTraba: { p: string; r: string }[];
};

export const pasosPorModulo: Record<string, Paso[]> = {
  computador: [
    {
      id: "encender", titulo: "Encender el computador",
      lograra: "encenderlo y reconocer cuándo ya está listo para usarse.",
      como: [
        "Busque el botón redondo con el símbolo de una línea dentro de un círculo. En los portátiles suele estar arriba del teclado; en los de escritorio, en la torre.",
        "Presiónelo una sola vez y suelte. No lo mantenga presionado.",
        "Espere. Puede tardar uno o dos minutos. Cuando aparezca el escritorio con los iconos, ya está listo.",
      ],
      ilustracion: "boton-encendido",
      practica: "Encienda el computador de la sede y espere hasta ver el escritorio.",
      siSeTraba: [
        { p: "Presioné el botón y no pasa nada.", r: "Revise que el cable de corriente esté conectado a la pared y al equipo. Si es un portátil, conéctelo al cargador y espere un minuto." },
        { p: "Se prendió una luz pero la pantalla sigue negra.", r: "En un computador de escritorio la pantalla tiene su propio botón de encendido. Búsquelo en la parte de abajo o al lado del monitor." },
      ],
    },
    {
      id: "raton", titulo: "Usar el ratón",
      lograra: "mover la flecha, hacer clic y abrir una carpeta.",
      como: [
        "Apoye la mano sobre el ratón sin apretarlo. Al moverlo sobre la mesa, la flecha se mueve en la pantalla.",
        "El botón izquierdo es el que más se usa: un clic selecciona; dos clics seguidos abren.",
        "El botón derecho muestra un menú con opciones. Si se abre por error, haga clic izquierdo en un espacio vacío y desaparece.",
      ],
      ilustracion: "raton",
      practica: "Mueva la flecha hasta el icono llamado «Este equipo» o «Equipo» y ábralo con dos clics.",
      siSeTraba: [
        { p: "La flecha se mueve muy rápido o muy lento.", r: "Es normal al principio. Mueva el ratón despacio y con toda la mano, no con los dedos. La velocidad se aprende en pocos días." },
        { p: "Hice dos clics y no abrió.", r: "Los dos clics deben ser seguidos, como tocar dos veces una puerta. Inténtelo un poco más rápido." },
      ],
    },
    {
      id: "teclado", titulo: "Escribir con el teclado",
      lograra: "escribir su nombre con mayúsculas, tildes y espacios.",
      como: [
        "La tecla larga de abajo es el espacio. La tecla «Enter» (con una flecha doblada) baja a la línea siguiente.",
        "Para una mayúscula, mantenga presionada «Shift» (la flecha hacia arriba) y toque la letra.",
        "Para escribir una tilde, toque primero la tecla del acento (´, al lado de la Ñ o de la P) y luego la vocal.",
        "La tecla «Retroceso» (flecha hacia la izquierda, arriba de Enter) borra lo último que escribió.",
      ],
      ilustracion: "teclado",
      practica: "Abra el programa «Bloc de notas» o cualquier procesador de texto y escriba su nombre completo con tildes.",
      siSeTraba: [
        { p: "Todo me sale en mayúscula.", r: "Quedó activada la tecla «Bloq Mayús». Tóquela una vez para apagarla." },
        { p: "La tilde me sale al lado de la vocal y no encima.", r: "Toque la tecla del acento, suéltela, y solo después toque la vocal. No las presione al tiempo." },
      ],
    },
    {
      id: "ventanas", titulo: "Abrir, mover y cerrar ventanas",
      lograra: "manejar los tres botones de la esquina de cualquier ventana.",
      como: [
        "Cada programa abre en una ventana. En la esquina superior derecha hay tres botones.",
        "El primero (una raya) esconde la ventana abajo, sin cerrarla. El segundo (un cuadro) la agranda a toda la pantalla. La X la cierra.",
        "Para mover una ventana, ponga la flecha sobre la franja de arriba, mantenga el clic y arrastre.",
      ],
      ilustracion: "ventana",
      practica: "Abra dos programas distintos, agrande uno, escóndalo, vuelva a abrirlo desde la barra de abajo y ciérrelo con la X.",
      siSeTraba: [
        { p: "Cerré con la X y me preguntó si quería guardar.", r: "Eso pasa cuando escribió algo. Si quiere conservarlo, elija «Guardar»; si era una prueba, «No guardar»." },
        { p: "Se me perdió la ventana.", r: "Mire la barra de abajo de la pantalla: los programas abiertos aparecen ahí. Haga clic sobre el que busca." },
      ],
    },
    {
      id: "apagar", titulo: "Apagar bien el computador",
      lograra: "apagarlo de forma segura para que no se dañe ni pierda trabajos.",
      como: [
        "Cierre los programas que tenga abiertos.",
        "Haga clic en el botón de inicio (esquina inferior izquierda, con el logo del sistema).",
        "Busque el símbolo de encendido y elija «Apagar». Espere a que la pantalla y las luces se apaguen solas.",
        "Solo si el equipo no responde a nada, mantenga presionado el botón físico unos 10 segundos.",
      ],
      ilustracion: "boton-encendido",
      practica: "Apague el computador desde el menú de inicio y vuelva a encenderlo.",
      siSeTraba: [
        { p: "Dice que está instalando actualizaciones y no se apaga.", r: "Es normal. No lo desconecte; espere a que termine, aunque tarde varios minutos." },
      ],
    },
  ],

  guia: [
    {
      id: "abrir", titulo: "Abrir el procesador de texto",
      lograra: "encontrar y abrir el programa para escribir documentos.",
      como: [
        "Haga clic en el botón de inicio y escriba «Word» o «Writer» (según el que tenga la sede).",
        "Haga clic en el programa cuando aparezca. Elija «Documento en blanco».",
      ],
      ilustracion: "documento",
      practica: "Abra el procesador de texto y deje un documento en blanco listo.",
      siSeTraba: [{ p: "No aparece ningún programa.", r: "Pregunte en el foro cuál procesador de texto tiene instalado el computador de la sede, o busque un icono con una letra W azul en el escritorio." }],
    },
    {
      id: "titulo", titulo: "Escribir el título y el texto",
      lograra: "escribir una guía corta con un título que se distinga.",
      como: [
        "Escriba el título en la primera línea, por ejemplo «Guía de ciencias: las plantas».",
        "Seleccione el título arrastrando el ratón sobre él con el clic presionado. Quedará sombreado.",
        "Con el título seleccionado, haga clic en la letra «N» de negrita y aumente el número del tamaño de letra (por ejemplo a 18).",
        "Toque Enter y escriba el texto de la guía debajo.",
      ],
      ilustracion: "documento",
      practica: "Escriba un título en negrita y tamaño 18, y dos frases de instrucciones para sus estudiantes.",
      siSeTraba: [{ p: "Al escribir se borra lo que ya tenía.", r: "Tiene texto seleccionado. Haga clic en un espacio vacío del documento para quitar la selección y vuelva a escribir." }],
    },
    {
      id: "imagen", titulo: "Poner una imagen",
      lograra: "insertar una imagen que tenga guardada en el computador.",
      como: [
        "Haga clic donde quiere la imagen.",
        "En la parte de arriba busque la pestaña «Insertar» y luego «Imágenes» o «Imagen».",
        "Aparece una ventana para buscar archivos. Ubique la imagen, selecciónela y elija «Insertar».",
        "Para cambiarle el tamaño, haga clic sobre la imagen y arrastre una de las esquinas.",
      ],
      ilustracion: "imagen",
      practica: "Inserte una imagen cualquiera (puede usar una que venga con el sistema) y hágala más pequeña.",
      siSeTraba: [{ p: "La imagen quedó gigante y no sé cómo achicarla.", r: "Haga clic sobre ella una vez. Verá unos puntos en las esquinas. Arrastre uno de los puntos de las esquinas hacia el centro." }],
    },
    {
      id: "guardar", titulo: "Guardar el documento con nombre",
      lograra: "guardar la guía en la carpeta Documentos con un nombre que reconozca.",
      como: [
        "Haga clic en «Archivo» (arriba a la izquierda) y luego en «Guardar como».",
        "Elija la carpeta «Documentos».",
        "En «Nombre de archivo» escriba un nombre claro, por ejemplo «Guia plantas tercero».",
        "Haga clic en «Guardar».",
      ],
      ilustracion: "guardar",
      practica: "Guarde su guía en Documentos con un nombre que incluya el tema y el grado.",
      siSeTraba: [
        { p: "No sé dónde quedó guardado.", r: "Abra «Este equipo» y luego la carpeta «Documentos». Si no está, use la lupa de búsqueda del sistema y escriba el nombre que le puso." },
        { p: "Dice que el nombre no es válido.", r: "Evite los signos / \\ : * ? \" < > |. Use solo letras, números y espacios." },
      ],
    },
    {
      id: "encontrar", titulo: "Volver a abrir la guía otro día",
      lograra: "encontrar un documento guardado y abrirlo.",
      como: [
        "Abra «Este equipo» desde el escritorio y entre a «Documentos».",
        "Busque el archivo por su nombre y ábralo con dos clics.",
        "Si hace cambios, guarde con «Archivo → Guardar» (o Ctrl + S): esta vez no pide nombre.",
      ],
      ilustracion: "carpeta",
      practica: "Cierre el programa, vuelva a abrir su guía desde Documentos y agréguele una frase.",
      siSeTraba: [{ p: "Abrí el archivo y está vacío.", r: "Probablemente cerró sin guardar. Escriba de nuevo y esta vez guarde con Ctrl + S antes de cerrar." }],
    },
    {
      id: "imprimir", titulo: "Imprimir o compartir la guía",
      lograra: "imprimir la guía o pasarla a una memoria USB.",
      como: [
        "Para imprimir: «Archivo → Imprimir», revise que la impresora sea la correcta y haga clic en «Imprimir».",
        "Para llevarla en una memoria: conecte la memoria, abra «Este equipo», arrastre el archivo desde Documentos hasta la memoria.",
        "Antes de sacar la memoria, haga clic en su icono en la barra de abajo y elija «Expulsar».",
      ],
      ilustracion: "carpeta",
      practica: "Copie su guía a una memoria USB y expúlsela con seguridad.",
      siSeTraba: [{ p: "No aparece la impresora.", r: "Revise que esté encendida y conectada. Si sigue sin aparecer, escríbalo en el foro con el nombre de la impresora." }],
    },
  ],

  presentacion: [
    { id: "abrir", titulo: "Abrir el programa de presentaciones", lograra: "abrir el programa y crear una presentación en blanco.",
      como: ["Haga clic en inicio y escriba «PowerPoint» o «Impress». Ábralo.", "Elija «Presentación en blanco»."],
      ilustracion: "presentacion", practica: "Deje una presentación en blanco abierta.",
      siSeTraba: [{ p: "No lo encuentro.", r: "Busque en el escritorio un icono naranja con la letra P, o pregunte en el foro qué programa tiene la sede." }] },
    { id: "diapositiva", titulo: "Escribir la primera diapositiva", lograra: "poner un título grande que se lea desde el fondo del salón.",
      como: ["Haga clic en el cuadro «Haga clic para agregar título» y escriba el tema de la clase.", "Seleccione el texto y suba el tamaño de letra a 40 o más. Letra grande y pocas palabras: los estudiantes deben leerla desde lejos."],
      ilustracion: "presentacion", practica: "Escriba el título de su próxima clase en tamaño 44.",
      siSeTraba: [{ p: "El texto se sale del cuadro.", r: "Use menos palabras o baje un poco el tamaño. Una diapositiva es un aviso, no una página." }] },
    { id: "nueva", titulo: "Agregar más diapositivas", lograra: "crear una diapositiva por cada idea de la clase.",
      como: ["Haga clic en «Nueva diapositiva» (pestaña Inicio). Aparece una nueva a la izquierda.", "Escriba una idea por diapositiva, máximo tres frases cortas.", "Para borrar una diapositiva, haga clic sobre ella a la izquierda y toque la tecla «Supr»."],
      ilustracion: "presentacion", practica: "Cree tres diapositivas con tres ideas de la clase.",
      siSeTraba: [{ p: "Se me borró una diapositiva sin querer.", r: "Presione Ctrl + Z: deshace lo último que hizo. Puede repetirlo varias veces." }] },
    { id: "imagen", titulo: "Poner una imagen en una diapositiva", lograra: "insertar una foto o dibujo desde el computador.",
      como: ["Vaya a la pestaña «Insertar» y elija «Imágenes».", "Busque el archivo y haga clic en «Insertar».", "Arrastre la imagen por el centro para moverla; arrastre una esquina para cambiar el tamaño."],
      ilustracion: "imagen", practica: "Ponga una imagen en una de sus diapositivas y acomódela al lado del texto.",
      siSeTraba: [{ p: "La imagen tapa el texto.", r: "Arrástrela hacia un lado o hágala más pequeña desde una esquina." }] },
    { id: "mostrar", titulo: "Mostrar la presentación", lograra: "proyectarla en pantalla completa y pasar de una diapositiva a otra.",
      como: ["Toque la tecla F5 (arriba del teclado) o haga clic en «Presentar desde el principio».", "Para avanzar, toque la barra espaciadora o la flecha derecha. Para retroceder, la flecha izquierda.", "Para salir, toque la tecla «Esc» (esquina superior izquierda del teclado)."],
      ilustracion: "presentacion", practica: "Presente sus diapositivas en pantalla completa, avance hasta la última y salga con Esc.",
      siSeTraba: [{ p: "En el televisor o proyector no se ve nada.", r: "Revise que el cable esté bien conectado a ambos lados y que el televisor esté en la entrada correcta (HDMI). Si sigue sin verse, toque las teclas Windows + P y elija «Duplicar»." }] },
    { id: "guardar", titulo: "Guardar la presentación", lograra: "guardarla con nombre para usarla otro día.",
      como: ["«Archivo → Guardar como», carpeta «Documentos», nombre claro, «Guardar».", "Si vuelve a hacer cambios después, basta con Ctrl + S."],
      ilustracion: "guardar", practica: "Guarde su presentación con el nombre del tema y el grado.",
      siSeTraba: [{ p: "No la encuentro después.", r: "Abra «Este equipo → Documentos» y búsquela por el nombre que le puso." }] },
  ],

  celular: [
    { id: "foto", titulo: "Tomar una foto clara", lograra: "fotografiar el trabajo de un estudiante de forma que se lea bien.",
      como: ["Abra la cámara del celular.", "Ponga la hoja sobre una superficie plana, con buena luz y sin sombra de su mano.", "Sostenga el celular derecho encima de la hoja, espere a que enfoque y toque el botón redondo."],
      ilustracion: "celular", practica: "Tome tres fotos de una hoja escrita y elija la más clara.",
      siSeTraba: [{ p: "La foto sale borrosa.", r: "Toque la pantalla justo sobre la hoja antes de disparar: eso obliga al celular a enfocar. Y no se mueva mientras toma la foto." }] },
    { id: "audio", titulo: "Grabar un audio corto", lograra: "grabar su voz para una explicación o una lectura.",
      como: ["Busque la aplicación «Grabadora» o «Grabadora de voz».", "Toque el botón rojo para empezar, hable cerca del celular y toque de nuevo para terminar.", "Escuche la grabación con el botón de reproducir."],
      ilustracion: "celular", practica: "Grabe una instrucción de un minuto para sus estudiantes y escúchela.",
      siSeTraba: [{ p: "No tengo la aplicación grabadora.", r: "Abra WhatsApp, entre a cualquier chat (incluso el suyo propio) y mantenga presionado el micrófono: también sirve para grabar." }] },
    { id: "pasar", titulo: "Pasar fotos al computador con el cable", lograra: "copiar las fotos del celular al computador.",
      como: ["Conecte el celular al computador con el cable de cargar.", "En el celular aparece una pregunta; elija «Transferir archivos» o «Transferencia de archivos».", "En el computador abra «Este equipo»; el celular aparece como un dispositivo. Entre, busque la carpeta «DCIM» o «Camera» y copie las fotos a Documentos."],
      ilustracion: "cable", practica: "Pase la foto del paso 1 al computador y ábrala.",
      siSeTraba: [
        { p: "El celular solo carga y no aparece en el computador.", r: "Deslice hacia abajo la barra de avisos del celular y toque el aviso de «Cargando por USB»; ahí cambie a «Transferir archivos»." },
        { p: "No tengo cable.", r: "También puede enviarse la foto a usted mismo por WhatsApp cuando haya señal y descargarla desde WhatsApp Web (módulo 5)." },
      ] },
    { id: "mostrar", titulo: "Mostrar la foto en clase", lograra: "abrir la foto en grande en el computador o el televisor.",
      como: ["Abra la foto con dos clics: se ve en el visor de imágenes.", "Para verla en pantalla completa, busque el botón de pantalla completa o toque F11.", "Con las flechas del teclado pasa a la siguiente foto de la carpeta."],
      ilustracion: "imagen", practica: "Muestre tres trabajos de estudiantes en pantalla completa, uno tras otro.",
      siSeTraba: [{ p: "La foto se ve acostada.", r: "En el visor hay un botón de girar (una flecha en círculo). Tóquelo hasta que quede derecha." }] },
    { id: "cuidado", titulo: "Cuidar el celular en el aula", lograra: "usar el celular sin riesgos para la clase ni para los estudiantes.",
      como: ["Antes de proyectar, cierre los chats y silencie las notificaciones.", "No fotografíe rostros de niños sin permiso de la familia; fotografíe los trabajos.", "Borre del celular las fotos que ya pasó al computador para no llenar la memoria."],
      ilustracion: "celular", practica: "Active el modo «No molestar» del celular y revise qué se ve en la pantalla antes de mostrarla.",
      siSeTraba: [{ p: "Se me llenó la memoria.", r: "Borre fotos ya copiadas y vacíe la papelera de la galería. Los videos ocupan mucho; empiece por ellos." }] },
  ],

  whatsapp: [
    { id: "cuando", titulo: "Cuándo hay señal y cuándo no", lograra: "reconocer si el mensaje salió o quedó esperando.",
      como: ["Arriba en el celular, las barras o el símbolo de datos indican si hay señal.", "Un mensaje con un reloj está esperando señal. Un chulo gris salió. Dos chulos llegaron.", "No hace falta reenviar: WhatsApp lo envía solo cuando vuelva la señal."],
      ilustracion: "whatsapp", practica: "Envíese un mensaje a usted mismo y observe los símbolos.",
      siSeTraba: [{ p: "El reloj no cambia hace horas.", r: "Es normal en la vereda. Cuando vaya al pueblo o haya señal, saldrá solo. No borre el mensaje." }] },
    { id: "foto", titulo: "Enviar una foto o un audio", lograra: "compartir el trabajo de un estudiante con un colega.",
      como: ["Abra el chat, toque el clip o el símbolo «+» y elija «Galería» para una foto.", "Para un audio, mantenga presionado el micrófono, hable y suelte.", "Para un documento (la guía del módulo 2), elija «Documento» y búsquelo."],
      ilustracion: "whatsapp", practica: "Envíe a un colega la foto del módulo 4 con un mensaje corto.",
      siSeTraba: [{ p: "El audio se borró al soltar.", r: "Si desliza el dedo hacia la izquierda mientras graba, se cancela. Grabe presionando sin mover el dedo, o deslice hacia arriba para dejar fijo el micrófono." }] },
    { id: "grupo", titulo: "Crear un grupo del curso", lograra: "tener un grupo con las familias o con los colegas.",
      como: ["Toque los tres puntos (o «Nuevo chat») y elija «Nuevo grupo».", "Seleccione las personas y toque la flecha.", "Escriba el nombre del grupo, por ejemplo «Familias 3° Agua bonita», y toque el chulo."],
      ilustracion: "whatsapp", practica: "Cree un grupo de prueba con dos colegas y envíe un saludo.",
      siSeTraba: [{ p: "No encuentro a una persona.", r: "Debe tenerla guardada en los contactos del celular. Guárdela primero con nombre y número y vuelva a intentarlo." }] },
    { id: "web", titulo: "Usar WhatsApp en el computador", lograra: "leer y descargar archivos del celular en el computador cuando hay señal.",
      como: ["En el computador abra el navegador y entre a web.whatsapp.com.", "En el celular: tres puntos → «Dispositivos vinculados» → «Vincular un dispositivo». Apunte la cámara al cuadro que aparece en el computador.", "Los archivos que descargue quedan en la carpeta «Descargas»."],
      ilustracion: "whatsapp", practica: "Vincule el computador y descargue una foto de un chat.",
      siSeTraba: [{ p: "El cuadro no se deja leer con la cámara.", r: "Limpie el lente y acerque o aleje el celular despacio. El computador y el celular deben tener señal en ese momento." }] },
    { id: "cuidados", titulo: "Cuidados al comunicarse con familias", lograra: "usar el grupo con respeto y sin riesgos.",
      como: ["Escriba en horarios razonables y solo asuntos del curso.", "No comparta fotos de niños en grupos abiertos; comparta trabajos, avisos y tareas.", "Si alguien escribe algo indebido, no responda en el grupo: hable con esa persona aparte."],
      ilustracion: "whatsapp", practica: "Escriba en el grupo de prueba un aviso de tarea con fecha y lo que deben traer.",
      siSeTraba: [{ p: "Una familia no tiene celular.", r: "El grupo es un apoyo, no reemplaza el cuaderno de avisos. Mantenga la nota escrita para quienes no estén en el grupo." }] },
  ],

  falla: [
    { id: "bloqueo", titulo: "El computador se bloquea", lograra: "recuperar el equipo sin perder la calma ni la clase.",
      como: ["Espere un minuto sin tocar nada: muchas veces se recupera solo.", "Si sigue igual, presione al tiempo Ctrl + Alt + Supr y elija «Administrador de tareas»; cierre el programa que diga «No responde».", "Como último recurso, mantenga presionado el botón de encendido 10 segundos, espere y vuelva a encender."],
      ilustracion: "alerta", practica: "Practique la combinación Ctrl + Alt + Supr y observe qué aparece.",
      siSeTraba: [{ p: "Perdí lo que estaba escribiendo.", r: "Al abrir de nuevo el programa, muchas veces ofrece «recuperar documento». Y de ahora en adelante, Ctrl + S cada pocos minutos." }] },
    { id: "senal", titulo: "No hay señal de internet", lograra: "seguir la clase con lo que sí funciona sin conexión.",
      como: ["Todo lo que esté guardado en el computador (guías, presentaciones, fotos, INTEGRA) funciona sin internet.", "Lo que necesite internet (videos en línea, WhatsApp Web) déjelo para cuando haya señal; prepare una alternativa guardada.", "Costumbre útil: cuando haya señal, descargue de una vez lo que usará la semana siguiente."],
      ilustracion: "alerta", practica: "Haga una lista de tres recursos que use en clase y marque cuáles funcionan sin internet.",
      siSeTraba: [{ p: "El video que necesito solo está en internet.", r: "Cuando tenga señal, descárguelo con la opción de descarga de la aplicación o pida a un colega que se lo pase por memoria USB." }] },
    { id: "archivo", titulo: "Un archivo no abre", lograra: "entender por qué no abre y qué hacer.",
      como: ["Si dice «no se puede abrir» o pide elegir un programa, es porque el computador no tiene el programa para ese tipo de archivo.", "Pídalo en otro formato (por ejemplo PDF, que abre en cualquier navegador) o pregunte en el foro qué programa se necesita.", "Si dice «archivo dañado», pida que se lo vuelvan a enviar."],
      ilustracion: "alerta", practica: "Abra un archivo PDF con el navegador (arrástrelo a la ventana del navegador).",
      siSeTraba: [{ p: "Abre pero se ve todo desordenado.", r: "Suele pasar con documentos hechos en otro programa. Pida que se lo envíen en PDF." }] },
    { id: "pedir", titulo: "Pedir ayuda sin pena", lograra: "describir el problema de manera que alguien pueda ayudar rápido.",
      como: ["Anote tres cosas: qué estaba haciendo, qué apareció en la pantalla (o tómele una foto) y qué intentó.", "Escríbalo en el foro de INTEGRA o llévelo a la jornada presencial.", "Equivocarse con la tecnología no daña nada que no se pueda arreglar; preguntar es parte de aprender."],
      ilustracion: "ayuda", practica: "Escriba en el foro un problema real que haya tenido, con esas tres cosas.",
      siSeTraba: [{ p: "Me da pena preguntar algo tan básico.", r: "En este foro solo hay colegas aprendiendo lo mismo. La pregunta que usted hace le sirve a otros que no se atreven." }] },
  ],
};

export function pasosDe(moduloId: string): Paso[] {
  return pasosPorModulo[moduloId] ?? [];
}
