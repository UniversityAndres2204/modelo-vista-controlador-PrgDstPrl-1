"use server";

import { createClient } from "@/lib/supabase/server";
import { Propietario } from "@/lib/interfaces";
import { getClient } from "@/ApolloClient";
import { gql } from "@apollo/client";

const CREATE_PROPIETARIO = gql`
  mutation CreatePropietario($input: propietarioInsertInput!) {
    insertIntopropietarioCollection(objects: [$input]) {
      affectedCount
    }
  }
`;

const UPDATE_PROPIETARIO = gql`
  mutation UpdatePropietario($id: BigInt!, $input: propietarioUpdateInput!) {
    updatepropietarioCollection(
      set: $input
      filter: { identificacion: { eq: $id } }
    ) {
      affectedCount
    }
  }
`;

const DELETE_PROPIETARIO = gql`
mutation DeletePropietario($id: BigInt!) {
    deleteFrompropietarioCollection(filter: { identificacion: { eq: $id } }) {
      affectedCount
    }
  }
`;

export async function crearPropietario(prop: Propietario) {
  const supabase = await createClient();
  delete prop.id
  const res = await supabase
    .from("propietario")
    .insert(prop)
    .select();

  if (res.error) throw new Error(res.error.message);

  return res.data;

  // const { data } = await getClient().mutate({
  //     mutation: CREATE_PROPIETARIO,
  //     variables: { input: prop },
  //   });
  
  //   return;
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
  // const supabase = await createClient();

  // const res = await supabase
  //   .from("propietario")
  //   .update({
  //     tipo: prop.tipo,
  //     nombre: prop.nombre,
  //     direccion: prop.direccion
  //   })
  //   .eq("identificacion", prop.identificacion);

  // if (res.error) throw new Error(res.error.message);

  // return true;

  const { data } = await getClient().mutate({
    mutation: UPDATE_PROPIETARIO,
    variables: { id: prop.identificacion ,input: {tipo: prop.tipo, nombre: prop.nombre, direccion: prop.direccion} },
  });

  return;
}

export async function eliminarPropietario(id: number) {
  // const supabase = await createClient();

  // const res = await supabase
  //   .from("propietario")
  //   .delete()
  //   .eq("identificacion", id);

  // if (res.error) throw new Error(res.error.message);

  // return true;

  const { data } = await getClient().mutate({
      mutation: DELETE_PROPIETARIO,
      variables: { id: id },
    });
  
    return;
}