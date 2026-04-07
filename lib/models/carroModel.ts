"use server";

import { createClient } from "@/lib/supabase/server";
import {Carro} from "@/lib/interfaces";
import {getClient, query,} from "@/ApolloClient";
import { gql } from "@apollo/client";

const GET_CARROS_POR_PROPIETARIO = gql`
  query ($propietario: String!) {
    carrosPorPropietario(propietario: $propietario) {
      id
      placa
      marca
      tipo
      fecha_matricula
      propietario: propietarioIdentificacion 
    }
  }
`;


const CREATE_CARRO = gql`
  mutation CrearCarro(
    $placa: String!
    $marca: String!
    $tipo: String!
    $fecha_matricula: String!
    $propietario: String!
  ) {
    crearCarro(
      placa: $placa
      marca: $marca
      tipo: $tipo
      fecha_matricula: $fecha_matricula
      propietario: {
        id: $propietario
      }
    ) {
      id
      placa
    }
  }

`;

const UPDATE_CARRO = gql`
  mutation UpdateCarro(
    $placa: String!
    $marca: String
    $tipo: String
    $fecha_matricula: String
  ) {
    updateCarro(
      placa: $placa
      marca: $marca
      tipo: $tipo
      fecha_matricula: $fecha_matricula
    ) {
      id
      placa
      marca
      tipo
      fecha_matricula
    }
  }
`;

const DELETE_CARRO = gql`
  mutation DeleteCarro($placa: String!) {
    deleteCarro(placa: $placa)
  }
`;

export async function crearCarro(car: Carro, ) {
  let res = await getClient().mutate({
    mutation: CREATE_CARRO,
    variables: {
      placa: car.placa,
      marca: car.marca,
      tipo: car.tipo,
      fecha_matricula: car.fecha_matricula,
      propietario: car.propietario
    },
  });
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
  const res = await query({
    query: GET_CARROS_POR_PROPIETARIO,
    variables: { propietario: id },
  });

  if (!res.data?.carrosPorPropietario) {
    throw new Error("No data fetched");
  }

  return res.data.carrosPorPropietario;
}

export async function actualizarCarro(car: Carro) {

  const { data } = await getClient().mutate({
    mutation: UPDATE_CARRO,
    variables: {
      placa: car.placa,
      marca: car.marca,
      tipo: car.tipo,
      fecha_matricula: car.fecha_matricula
    },
  });

  return;
}

export async function eliminarCarro(placa: string): Promise<boolean> {
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

  if (!data) { return false }

  return true;
}