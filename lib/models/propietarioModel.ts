"use server";

import { createClient } from "@/lib/supabase/server";
import {Carro, Propietario} from "@/lib/interfaces";

// TODO: Ver como se manjean los propietarios si se relacionan con la tabla interna de supabase
export async function idk() {
  const supabase = await createClient();
}