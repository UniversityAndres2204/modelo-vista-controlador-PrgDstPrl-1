import { createYoga, createSchema } from "graphql-yoga";
import { createClient } from "@/lib/supabase/server";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: async () => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return { supabase, user };
  },
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { yoga as GET, yoga as POST };