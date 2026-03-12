"use server";

import { createClient } from "@/lib/supabase/server";
import { Infraccion } from "@/lib/interfaces";



export async function crearInfraccion(inf: Infraccion) {
  const supabase = await createClient();
  const res = await supabase
    .from("carro")
    .insert(inf)
    .select();

  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function obtenerInfraccionPorPropietario(idPropietario: string) {
  const supabase = await createClient();
  const res = await supabase
    .from("infraccion")
    .select("*")
    .eq("propietario", idPropietario);
  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function obtenerInfraccionPorCarro(placa: string) {
  const supabase = await createClient();
  const res = await supabase
    .from("infraccion")
    .select("*")
    .eq("placa_carro", placa);
  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function actualizarInfraccion(inf: Infraccion) {
  const supabase = await createClient();
  const res  = await supabase
    .from("infraccion")
    .update( inf )
    .eq("id", inf.id);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true };
}

export async function eliminarCarro(idInfraccion: string) {
  const supabase = await createClient();
  let res = await supabase
    .from("infraccion")
    .delete()
    .eq("id", idInfraccion);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true }
}