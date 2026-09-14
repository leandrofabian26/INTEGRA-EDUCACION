import { useCallback, useEffect, useState } from "react";
import {
  contarChatsNoLeidos, enviarMensajeChat, leerConversacion, listarColegas,
  listarConversaciones, marcarConversacionLeida, registrarEvento,
  type MensajeChat, type Usuario,
} from "@/lib/almacen";

/* Lista de conversaciones para la pantalla "Chat", una fila por colega. */
export function useConversaciones(correo?: string) {
  const [conversaciones, setConversaciones] = useState<{ colega: Usuario; ultimo: MensajeChat | null; noLeidos: number }[]>([]);
  const [listo, setListo] = useState(false);

  const cargar = useCallback(async () => {
    if (!correo) return;
    setConversaciones(await listarConversaciones(correo));
    setListo(true);
  }, [correo]);

  useEffect(() => { cargar(); }, [cargar]);

  return { conversaciones, listo };
}

/* Una conversación privada entre el usuario y un colega puntual. */
export function useChat(propio?: string, otro?: string) {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [colega, setColega] = useState<Usuario | null>(null);
  const [listo, setListo] = useState(false);

  const cargar = useCallback(async () => {
    if (!propio || !otro) return;
    setMensajes(await leerConversacion(propio, otro));
    await marcarConversacionLeida(propio, otro);
    setListo(true);
  }, [propio, otro]);

  useEffect(() => { cargar(); }, [cargar]);

  useEffect(() => {
    if (!propio || !otro) { setColega(null); return; }
    listarColegas(propio).then((colegas) => setColega(colegas.find((c) => c.correo === otro) ?? null));
  }, [propio, otro]);

  const enviar = useCallback(async (texto: string, enLinea: boolean) => {
    if (!propio || !otro || !texto.trim()) return;
    await enviarMensajeChat(propio, otro, texto.trim(), enLinea);
    await registrarEvento(propio, "chat_enviar", otro);
    await cargar();
  }, [propio, otro, cargar]);

  return { mensajes, colega, listo, enviar };
}

/* Total de mensajes sin leer, para el aviso en el menú. `clave` fuerza a
   recalcular (por ejemplo, al cambiar de página). */
export function useChatsNoLeidos(correo?: string, clave?: string) {
  const [noLeidos, setNoLeidos] = useState(0);
  useEffect(() => {
    if (!correo) { setNoLeidos(0); return; }
    let activo = true;
    contarChatsNoLeidos(correo).then((n) => { if (activo) setNoLeidos(n); });
    return () => { activo = false; };
  }, [correo, clave]);
  return noLeidos;
}
