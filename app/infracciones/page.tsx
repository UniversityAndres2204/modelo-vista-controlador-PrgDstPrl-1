import InfracccionesList from "@/components/InfraccionesList";
import {obtenerInfracciones} from "@/lib/models/infraccionModel";
import {createClient} from "@/lib/supabase/server";
import {query} from "@/ApolloClient";
import {gql} from "@apollo/client";

const GET_INFRACCIONES = gql`
  query GetInfracciones {
    infraccionCollection {
      edges {
        node {
          id
          accionada
          fecha
          placa_carro
        }
      }
    }
  }
`;

export default async function Home() {
  const infracciones = await obtenerInfracciones();
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const {data} = await query({
    query: GET_INFRACCIONES,
  });

  console.log(data.infraccionCollection.edges);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <main className="flex-1 flex flex-col gap-6 px-4">
          <InfracccionesList userId={user.id} infracciones={infracciones}/>
        </main>
      </div>
    </main>
  );
}