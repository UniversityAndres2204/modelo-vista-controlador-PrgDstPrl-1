"use server";

import { createClient } from "@/lib/supabase/server";
import {Carro} from "@/lib/interfaces";
import { getClient } from "@/ApolloClient";
import { gql } from "@apollo/client";

const CREATE_CARRO = gql`
  mutation CreateCarro($input: carroInsertInput!) {
    insertIntocarroCollection(objects: [$input]) {
      affectedCount
    }
  }
`;

const UPDATE_CARRO = gql`
  mutation UpdateCarro($id: BigInt!, $input: carroUpdateInput!) {
    updatecarroCollection(
      set: $input
      filter: { id: { eq: $id } }
    ) {
      affectedCount
    }
  }
`;

const DELETE_CARRO = gql`
  mutation DeleteCarro($placa: String!) {
    deleteFromcarroCollection(filter: { placa: { eq: $placa } }) {
      affectedCount
    }
  }
`;

export async function crearCarro(car: Carro) {
  // const supabase = await createClient();
  // const res = await supabase
  //   .from("carro")
  //   .insert( car )
  //   .select();

  // if (res.error) { throw new Error(res.error.message) }
  // return { success: res.data }

  const { data } = await getClient().mutate({
    mutation: CREATE_CARRO,
    variables: { input: car },
  });

  return;
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
  // const supabase = await createClient();
  // const res  = await supabase
  //   .from("carro")
  //   .update( car )
  //   .eq("placa", car.placa);

  // if (res.error) { throw new Error(res.error.message)}
  // return { success: true };

  const Id = car.id
  delete car.id
  const { data } = await getClient().mutate({
    mutation: UPDATE_CARRO,
    variables: { id: Id ,input: car },
  });

  return;
}

export async function eliminarCarro(placa: string) {
  // const supabase = await createClient();
  // let res = await supabase
  //   .from("carro")
  //   .delete()
  //   .eq("placa", placa);

  // if (res.error) { throw new Error(res.error.message)}
  // return { success: true }

  const { data } = await getClient().mutate({
    mutation: DELETE_CARRO,
    variables: { placa: placa },
  });

  return;
}