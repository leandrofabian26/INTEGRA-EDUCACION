/*
  Cuestionario de autopercepción sobre el uso de las TIC (Anexo A de la tesis).
  Se aplica al inicio (ciclo 1) y al cierre (ciclo 3). Una pregunta por pantalla.
*/
export const ESCALA = ["Nunca", "Casi nunca", "A veces", "Con frecuencia", "Siempre"] as const;

export type Pregunta =
  | { id: string; seccion: string; texto: string; tipo: "escala" }
  | { id: string; seccion: string; texto: string; tipo: "numero" }
  | { id: string; seccion: string; texto: string; tipo: "abierta" };

export const preguntas: Pregunta[] = [
  { id: "edad", seccion: "Datos generales", texto: "¿Cuántos años tiene?", tipo: "numero" },
  { id: "experiencia", seccion: "Datos generales", texto: "¿Cuántos años lleva como docente?", tipo: "numero" },
  { id: "sede", seccion: "Datos generales", texto: "¿Cuántos años lleva en la sede de Agua bonita?", tipo: "numero" },
  { id: "grados", seccion: "Datos generales", texto: "¿Qué grados y áreas orienta?", tipo: "abierta" },

  { id: "acceso_pc", seccion: "Acceso y manejo", texto: "Tengo acceso a un computador en la sede cuando lo necesito.", tipo: "escala" },
  { id: "acceso_internet", seccion: "Acceso y manejo", texto: "Tengo acceso a internet en la sede cuando lo necesito.", tipo: "escala" },
  { id: "seguro_pc", seccion: "Acceso y manejo", texto: "Me siento seguro(a) manejando un computador sin ayuda.", tipo: "escala" },
  { id: "resolver", seccion: "Acceso y manejo", texto: "Sé cómo actuar cuando un programa no funciona o el equipo se bloquea.", tipo: "escala" },
  { id: "celular", seccion: "Acceso y manejo", texto: "Uso un teléfono inteligente para tareas distintas a llamar y enviar mensajes.", tipo: "escala" },

  { id: "planear", seccion: "Uso pedagógico", texto: "Uso tecnología para preparar mis clases (buscar material, escribir guías).", tipo: "escala" },
  { id: "en_clase", seccion: "Uso pedagógico", texto: "Uso tecnología durante la clase con mis estudiantes.", tipo: "escala" },
  { id: "evaluar", seccion: "Uso pedagógico", texto: "Uso tecnología para evaluar o hacer seguimiento a mis estudiantes.", tipo: "escala" },
  { id: "formacion_util", seccion: "Uso pedagógico", texto: "He recibido formación en TIC que pude aplicar en mi aula.", tipo: "escala" },
  { id: "formacion_contexto", seccion: "Uso pedagógico", texto: "La formación en TIC que he recibido tuvo en cuenta la realidad de mi sede.", tipo: "escala" },

  { id: "temor", seccion: "Actitud y emociones", texto: "Me da temor equivocarme cuando uso tecnología frente a otros.", tipo: "escala" },
  { id: "rapidez", seccion: "Actitud y emociones", texto: "Siento que la tecnología avanza más rápido de lo que puedo aprender.", tipo: "escala" },
  { id: "pedir_ayuda", seccion: "Actitud y emociones", texto: "Prefiero pedir ayuda a un colega más joven antes que intentarlo solo(a).", tipo: "escala" },
  { id: "puedo", seccion: "Actitud y emociones", texto: "Creo que a mi edad todavía puedo aprender a usar nuevas herramientas.", tipo: "escala" },
  { id: "interes", seccion: "Actitud y emociones", texto: "Me interesa usar más tecnología en mis clases si tengo acompañamiento.", tipo: "escala" },

  { id: "fallas", seccion: "Contexto territorial", texto: "Las fallas de internet me han hecho abandonar actividades con tecnología.", tipo: "escala" },
  { id: "aislamiento", seccion: "Contexto territorial", texto: "Me siento aislado(a) de otros docentes para compartir experiencias con TIC.", tipo: "escala" },

  { id: "dificulta", seccion: "Para terminar", texto: "¿Qué es lo que más le dificulta usar tecnología en su clase?", tipo: "abierta" },
  { id: "gustaria", seccion: "Para terminar", texto: "¿Qué le gustaría aprender a hacer con tecnología para su aula?", tipo: "abierta" },
  { id: "formacion_ideal", seccion: "Para terminar", texto: "¿Cómo le gustaría que fuera una formación en TIC pensada para usted?", tipo: "abierta" },
];

export const clavesCuestionario = preguntas.map((p) => p.id);
