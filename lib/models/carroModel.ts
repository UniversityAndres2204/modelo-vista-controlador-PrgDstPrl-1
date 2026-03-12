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

export async function obtenerCarros() {
  const supabase = await createClient();
  const res = await supabase
    .from("carro")
    .select("*");

  if (res.error) { throw new Error(res.error.message)}
  return res.data;
}

export async function obtenerCarroPorPropietario(id: string) {
  const supabase = await createClient();
  const res = await supabase
    .from("carro")
    .select("*")
    .eq("propietario", id);
  if (res.error) { throw new Error(res.error.message) }
  return { success: res.data }
}

export async function actualizarCarro(car: Carro) {
  const supabase = await createClient();
  delete car.id;
  const res  = await supabase
    .from("carro")
    .update( car )
    .eq("placa", car.placa);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true };
}

export async function eliminarCarro(placa: string) {
  const supabase = await createClient();
  let res = await supabase
    .from("carro")
    .delete()
    .eq("placa", placa);

  if (res.error) { throw new Error(res.error.message)}
  return { success: true }
}