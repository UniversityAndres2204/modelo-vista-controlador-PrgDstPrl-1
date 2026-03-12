
import PropietariosList from "@/components/PropietariosList";
import {createClient} from "@/lib/supabase/server";
import {obtenerPropietarios} from "@/lib/models/propietarioModel";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user },} = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

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