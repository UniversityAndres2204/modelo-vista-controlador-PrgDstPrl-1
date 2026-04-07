import { createClient } from "@/lib/supabase/server";

export const resolvers = {
  Query: {
    propietarios: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from("propietario").select("*");
      if (error) throw new Error(error.message);
      return data;
    },

    carros: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from("carro").select("*");
      if (error) throw new Error(error.message);
      return data;
    },

    carrosPorPropietario: async (_: any, { propietario }: any, ctx: any) => {
      const { data, error } = await ctx.supabase
        .from("carro")
        .select("*")
        .eq("propietario", propietario);
      if (error) throw new Error(error.message);
      return data;
    },

    carroByPlaca: async (_: any, { placa }: any) => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("carro")
        .select("*")
        .eq("placa", placa)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    infracciones: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from("infraccion").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    // PROPIETARIOS
    crearPropietario: async (_: any, args: any) => {
      const supabase = await createClient()
      // No insertamos 'identificacion' porque es GENERATED ALWAYS AS IDENTITY
      const { data, error } = await supabase
        .from("propietario")
        .insert({
          nombre: args.nombre,
          direccion: args.direccion,
          tipo: args.tipo,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    updatePropietario: async (_: any, args: any, ctx: any) => {
      const supabase = await createClient();
      const  { data, error }  = await supabase
        .from("propietario")
        .update( args )
        .eq("identificacion", args.identificacion)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Propietario no encontrado");
      return data;
    },

    deletePropietario: async (_: any, { identificacion }: any) => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("propietario")
        .delete()
        .eq("identificacion", identificacion);

      if (error) throw new Error(error.message);
      return true;
    },

    // CARROS
    crearCarro: async (_: any, args: any, ctx: any) => {
      const supabase = await createClient();
      const {placa, marca, tipo, fecha_matricula, propietario} = args;

      const { data, error } = await supabase
        .from("carro")
        .insert({placa, marca, tipo, fecha_matricula, propietario: propietario.id})
        .select()
        .single();

      console.log(data, error)

      if (error) throw new Error(error.message);
      return data;
    },

    updateCarro: async (_: any, args: any, ctx: any) => {
      const supabase = await createClient();
      const  { data, error }  = await supabase
        .from("carro")
        .update( args )
        .eq("placa", args.placa)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Carro no encontrado");
      return data;
    },

    deleteCarro: async (_: any, { placa }: any) => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("carro")
        .delete()
        .eq("placa", placa);

      if (error) throw new Error(error.message);
      return true;
    },

    // INFRACCIONES
    crearInfraccion: async (_: any, args: any) => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("infraccion")
        .insert({
          fecha: args.fecha,
          placa_carro: args.placa_carro,
          accionada: args.accionada,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    updateInfraccion: async (_: any, args: any, ctx: any) => {
      const supabase = await createClient();
      const  { data, error }  = await supabase
        .from("infraccion")
        .update( {
          placa_carro: args.placa_carro,
          accionada: args.accionada,
          fecha: args.fecha,
        } )
        .eq("id", args.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("infraccion no encontrada");

      return data;
    },

    deleteInfraccion: async (_: any, { id }: any) => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("infraccion")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);
      return true;
    },
  },

  // === RELACIONES (Resolvers de campos) ===
  Carro: {
    propietario: async (parent: any, _: any, ctx: any) => {
      const supabaseClient = ctx?.supabase || (await createClient());
      const { data, error } = await supabaseClient
        .from("propietario")
        .select("*")
        .eq("id", parent.propietario)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    propietarioIdentificacion: async (parent: any, _: any, ctx: any) => {
      const supabaseClient = ctx?.supabase || (await createClient());
      const { data, error } = await supabaseClient
        .from("propietario")
        .select("id")
        .eq("id", parent.propietario)
        .single();

      if (error) throw new Error(error.message);
      return data?.id;
    },

    infracciones: async (parent: any, _: any, ctx: any) => {
      const supabaseClient = ctx?.supabase || (await createClient());
      const { data, error } = await supabaseClient
        .from("infraccion")
        .select("*")
        .eq("placa_carro", parent.placa);

      if (error) throw new Error(error.message);
      return data || [];
    },
  },

  Propietario: {
    carros: async (parent: any, _: any, ctx: any) => {
      const supabaseClient = ctx?.supabase || (await createClient());
      const { data, error } = await supabaseClient
        .from("carro")
        .select("*")
        .eq("propietario", parent.id);

      if (error) throw new Error(error.message);
      return data || [];
    },
  },

  Infraccion: {
    carro: async (parent: any, _: any, ctx: any) => {
      const supabaseClient = ctx?.supabase || (await createClient());
      const { data, error } = await supabaseClient
        .from("carro")
        .select("*")
        .eq("placa", parent.placa_carro)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  },
};