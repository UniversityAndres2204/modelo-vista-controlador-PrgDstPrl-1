import { Tabla } from "@/utils/interfaces";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function read(tabla: Tabla) {
    const data = await supabase.from(tabla).select();
    return data.data
}