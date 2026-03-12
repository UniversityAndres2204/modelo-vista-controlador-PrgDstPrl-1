"use server";

import { createClient } from "@/lib/supabase/server";
import { Propietario } from "@/lib/interfaces";

export async function crearPropietario(prop: Propietario) {
  const supabase = await createClient();

  const res = await supabase
    .from("propietario")
    .insert(prop)
    .select();

  if (res.error) throw new Error(res.error.message);

  return res.data;
}

export async function obtenerPropietarios() {
  const supabase = await createClient();

  const res = await supabase
    .from("propietario")
    .select("*")
    .order("identificacion");

  if (res.error) throw new Error(res.error.message);

  return res.data;
}

export async function obtenerPropietarioPorId(id: number) {
  const supabase = await createClient();

  const res = await supabase
    .from("propietario")
    .select("*")
    .eq("identificacion", id)
    .single();

  if (res.error) throw new Error(res.error.message);

  return res.data;
}

export async function actualizarPropietario(prop: Propietario) {
  const supabase = await createClient();

  const res = await supabase
    .from("propietario")
    .update({
      tipo: prop.tipo,
      nombre: prop.nombre,
      direccion: prop.direccion
    })
    .eq("identificacion", prop.identificacion);

  if (res.error) throw new Error(res.error.message);

  return true;
}

export async function eliminarPropietario(id: number) {
  const supabase = await createClient();

  const res = await supabase
    .from("propietario")
    .delete()
    .eq("identificacion", id);

  if (res.error) throw new Error(res.error.message);

  return true;
}