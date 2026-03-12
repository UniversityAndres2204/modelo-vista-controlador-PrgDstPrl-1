"use server";

import { createClient } from "@/lib/supabase/server";
import {Carro} from "@/lib/interfaces";

export async function crearCarro(car: Carro) {
  const supabase = await createClient();
  const res = await supabase
    .from("carro")
    .insert( car )
    .select();

  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function obtenerCarroPorPropietario(idPropietario: string) {
  const supabase = await createClient();
  const res = await supabase
    .from("carro")
    .select("*")
    .eq("propietario", idPropietario);
  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function actualizarCarro(car: Carro) {
  const supabase = await createClient();
  const res  = await supabase
    .from("carro")
    .update( car )
    .eq("id", car.id);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true };
}

export async function eliminarCarro(idCarro: string) {
  const supabase = await createClient();
  let res = await supabase
    .from("carro")
    .delete()
    .eq("id", idCarro);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true }
}