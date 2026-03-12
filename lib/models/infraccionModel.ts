"use server";

import { createClient } from "@/lib/supabase/server";
import { Infraccion } from "@/lib/interfaces";

/* =========================
   CREAR
========================= */

export async function crearInfraccion(inf: Omit<Infraccion, "id">) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("infraccion")
    .insert(inf)
    .select()
    .single();
  
  if (error?.message === 'insert or update on table "infraccion" violates foreign key constraint "infraccion_carro_fkey"') {
    return}
  else if(error){
    throw new Error(error.message)
  }

  return data;
}

/* =========================
   OBTENER TODAS
========================= */

export async function obtenerInfracciones() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("infraccion")
    .select("*")
    .order("fecha", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

/* =========================
   OBTENER POR ID
========================= */

export async function obtenerInfraccionPorId(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("infraccion")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

/* =========================
   OBTENER POR CARRO
========================= */

export async function obtenerInfraccionPorCarro(placa: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("infraccion")
    .select("*")
    .eq("placa_carro", placa);

  if (error) throw new Error(error.message);

  return data ?? [];
}

/* =========================
   OBTENER POR PROPIETARIO
========================= */

export async function obtenerInfraccionPorPropietario(idPropietario: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("infraccion")
    .select(`
      *,
      carro!inner (
        propietario
      )
    `)
    .eq("carro.propietario", idPropietario);

  if (error) throw new Error(error.message);

  return data ?? [];
}

/* =========================
   ACTUALIZAR
========================= */

export async function actualizarInfraccion(inf: Infraccion) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("infraccion")
    .update({
      placa_carro: inf.placa_carro,
      accionada: inf.accionada,
      fecha: inf.fecha,
    })
    .eq("id", inf.id);

  return error;
}

/* =========================
   ELIMINAR
========================= */

export async function eliminarInfraccion(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("infraccion")
    .delete()
    .eq("id", id);

  return error;
}