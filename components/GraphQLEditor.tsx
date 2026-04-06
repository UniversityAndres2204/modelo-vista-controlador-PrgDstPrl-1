"use client";

import {GraphiQL} from "graphiql";
import 'graphiql/style.css';
import {createClient} from "@/lib/supabase/client";

export default function GraphQLEditor() {
  async function fetcher(graphQLParams: any) {
    let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    if (!url || !apiKey) {
      throw Error("No supabase url or public api key is not set");
    }

    const { data } = await createClient().auth.getSession();
    const token = data.session?.access_token;

    const response = await fetch(url+"/graphql/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "apiKey": apiKey
      },
      body: JSON.stringify(graphQLParams),
    });
    return response.json();
  }

  return (
    <div className="h-full min-h-0">
      <GraphiQL fetcher={fetcher} />
    </div>
  );
}