/*
  Cliente único de Supabase. Es la única pieza de INTEGRA que necesita
  internet: todo lo demás sigue funcionando desde el almacén local
  (src/lib/almacen.ts) aunque este cliente nunca llegue a usarse.
*/
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigurado = Boolean(url && anonKey);

export const supabase = supabaseConfigurado
  ? createClient(url!, anonKey!)
  : null;
