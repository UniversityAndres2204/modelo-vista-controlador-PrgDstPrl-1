
import InfracccionesList from "@/components/InfraccionesList";
import {obtenerInfracciones} from "@/lib/models/infraccionModel";
import {createClient} from "@/lib/supabase/server";

export default async function Home() {
  const infracciones = await obtenerInfracciones();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
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