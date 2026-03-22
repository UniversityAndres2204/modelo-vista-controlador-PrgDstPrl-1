
import PropietariosList from "@/components/PropietariosList";
import {createClient} from "@/lib/supabase/server";
import {obtenerPropietarios} from "@/lib/models/propietarioModel";
import { query } from "@/ApolloClient";
import { gql } from "@apollo/client";

const GET_PROPIETARIOS = gql`
  query GetPropietarios {
    propietarioCollection {
      edges {
        node {
          id
          nombre
          tipo
          identificacion
          direccion
        }
      }
    }
  }
`;

export default async function Home() {
  const supabase = await createClient();
  const { data: { user },} = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data } = await query({
    query: GET_PROPIETARIOS,

  });
  console.log(data.propietarioCollection.edges);

  const propietarios = await obtenerPropietarios();
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">

        <main className="flex-1 flex flex-col gap-6 px-4">
          <PropietariosList userId={user.id} propietarios={propietarios}/>
        </main>
      </div>
    </main>
  );
}