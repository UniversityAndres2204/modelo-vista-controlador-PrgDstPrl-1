import CarrosList from "@/components/CarrosList";
import {obtenerCarroPorPropietario} from "@/lib/models/carroModel";
import {createClient} from "@/lib/supabase/server";
import { query } from "@/ApolloClient";
import { gql } from "@apollo/client";

const GET_CARROS = gql`
  query GetCarros {
    carroCollection {
      edges {
        node {
          id
          placa
          marca
          tipo
          fecha_matricula
          propietario {
            identificacion
          }
        }
      }
    }
  }
`;

export default async function Home() {
  const supabase = await createClient();
  const {data: { user },} = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data } = await query({
      query: GET_CARROS,
  
    });

  console.log(data.carroCollection.edges);

  const { success: carros } = await obtenerCarroPorPropietario(user.id);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <main className="flex-1 flex flex-col gap-6 px-4">
          <CarrosList userId={user.id} carros={carros}/>
        </main>
      </div>
    </main>
  );
}