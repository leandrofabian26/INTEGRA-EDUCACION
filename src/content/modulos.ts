/*
  Módulos iniciales de INTEGRA.
  Son un punto de partida: los módulos definitivos se construyen con las
  barreras que identifiquen los docentes en el ciclo 1 de la investigación.
  Todos están pensados para funcionar sin conexión a internet.
  En la Entrega 3 cada módulo se dividirá en pasos (cápsulas de 5 a 10 minutos).
*/
export type Modulo = {
  id: string;
  numero: number;
  titulo: string;
  paraQue: string;      // en palabras del docente: qué va a lograr
  duracion: string;
  pasos: number;
  necesitaInternet: boolean;
};

export const modulos: Modulo[] = [
  {
    id: "computador",
    numero: 1,
    titulo: "Conocer el computador de la sede",
    paraQue: "Encenderlo, apagarlo con seguridad, usar el ratón y el teclado sin miedo a dañar nada.",
    duracion: "40 minutos",
    pasos: 5,
    necesitaInternet: false,
  },
  {
    id: "guia",
    numero: 2,
    titulo: "Escribir una guía para mis estudiantes",
    paraQue: "Crear un documento con título, texto y una imagen, guardarlo y encontrarlo después.",
    duracion: "50 minutos",
    pasos: 6,
    necesitaInternet: false,
  },
  {
    id: "presentacion",
    numero: 3,
    titulo: "Preparar una presentación para la clase",
    paraQue: "Armar unas diapositivas sencillas con letra grande y mostrarlas en el aula.",
    duracion: "50 minutos",
    pasos: 6,
    necesitaInternet: false,
  },
  {
    id: "celular",
    numero: 4,
    titulo: "Usar el celular en el aula",
    paraQue: "Tomar fotos de los trabajos, grabar un audio corto y pasarlos al computador.",
    duracion: "35 minutos",
    pasos: 5,
    necesitaInternet: false,
  },
  {
    id: "whatsapp",
    numero: 5,
    titulo: "Comunicarme con colegas y familias cuando hay señal",
    paraQue: "Enviar mensajes, fotos y documentos por WhatsApp y organizar un grupo del curso.",
    duracion: "40 minutos",
    pasos: 5,
    necesitaInternet: true,
  },
  {
    id: "falla",
    numero: 6,
    titulo: "Cuando la tecnología falla",
    paraQue: "Saber qué hacer si el equipo se bloquea, no hay señal o un archivo no abre, sin perder la clase.",
    duracion: "30 minutos",
    pasos: 4,
    necesitaInternet: false,
  },
];

/* Estado de avance de ejemplo. En la Entrega 2 se guardará en el equipo. */
export type Avance = { moduloId: string; pasosCompletados: number };
export const avanceEjemplo: Avance[] = [
  { moduloId: "computador", pasosCompletados: 5 },
  { moduloId: "guia", pasosCompletados: 2 },
];

export function estadoDe(modulo: Modulo, avance: Avance[]) {
  const a = avance.find((x) => x.moduloId === modulo.id);
  if (!a || a.pasosCompletados === 0) return { tipo: "pendiente" as const, hechos: 0 };
  if (a.pasosCompletados >= modulo.pasos) return { tipo: "completado" as const, hechos: modulo.pasos };
  return { tipo: "en-curso" as const, hechos: a.pasosCompletados };
}
