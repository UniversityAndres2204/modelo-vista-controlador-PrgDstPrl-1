import {HttpLink} from "@apollo/client";
import {SetContextLink} from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache
} from "@apollo/client-integration-nextjs";
import { createClient } from "@/lib/supabase/client"

const authLink = new SetContextLink(async (prevContext) => {
  const { data } = await createClient().auth.getSession();
  const token = data.session?.access_token;

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    },
  };
});

const httpLink = new HttpLink({
  uri: typeof window === 'undefined'
    ? 'http://127.0.0.1:3000/api/graphql'   // servidor
    : '/api/graphql',                       // cliente
  fetchOptions: {},
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});