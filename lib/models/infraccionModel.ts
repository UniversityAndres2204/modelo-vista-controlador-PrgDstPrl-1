"use server";

import { createClient } from "@/lib/supabase/server";
import { Infraccion } from "@/lib/interfaces";
import { getClient } from "@/ApolloClient";
import { gql } from "@apollo/client";

const CREATE_INFRACCION = gql`
  mutation CreateInfraccion($input: infraccionInsertInput!) {
    insertIntoinfraccionCollection(objects: [$input]) {
      affectedCount
    }
  }
`;

const UPDATE_INFRACCION = gql`
  mutation UpdateInfraccion($id: UUID!, $input: infraccionUpdateInput!) {
    updateinfraccionCollection(
      set: $input
      filter: { id: { eq: $id } }
    ) {
      affectedCount
    }
  }
`;

const DELETE_INFRACCION = gql`
mutation DeleteInfraccion($id: UUID!) {
    deleteFrominfraccionCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;


/* =========================
   CREAR
========================= */

export async function crearInfraccion(inf: Omit<Infraccion, "id">) {
  // const supabase = await createClient();

  // const { data, error } = await supabase
  //   .from("infraccion")
  //   .insert(inf)
  //   .select()
  //   .single();
  
  // if (error?.message === 'insert or update on table "infraccion" violates foreign key constraint "infraccion_carro_fkey"') {
  //   return}
  // else if(error){
  //   throw new Error(error.message)
  // }

  // return data;

  const { data } = await getClient().mutate({
      mutation: CREATE_INFRACCION,
      variables: { input: inf },
    });
  
    return;
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
  // const supabase = await createClient();

  // const { error } = await supabase
  //   .from("infraccion")
  //   .update({
  //     placa_carro: inf.placa_carro,
  //     accionada: inf.accionada,
  //     fecha: inf.fecha,
  //   })
  //   .eq("id", inf.id);

  // return error;

  const { data } = await getClient().mutate({
      mutation: UPDATE_INFRACCION,
      variables: { id: inf.id ,input: {placa_carro: inf.placa_carro, accionada: inf.accionada, fecha: inf.fecha} },
    });
  
    return;
}

/* =========================
   ELIMINAR
========================= */

export async function eliminarInfraccion(id: number) {
  // const supabase = await createClient();

  // const { error } = await supabase
  //   .from("infraccion")
  //   .delete()
  //   .eq("id", id);

  // return error;

  const { data } = await getClient().mutate({
        mutation: DELETE_INFRACCION,
        variables: { id: id },
      });
    
      return;
}