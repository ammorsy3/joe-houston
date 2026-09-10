/**
 * Server-side Supabase client — PLACEHOLDER.
 *
 * Used from Server Components, Server Actions and Route Handlers once the
 * database exists. Nothing in this build calls it.
 *
 * TODO: when Supabase is added —
 *   1. npm install @supabase/supabase-js @supabase/ssr
 *   2. set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only, never
 *      NEXT_PUBLIC_) for privileged writes such as the lead insert
 *   3. replace the body below with `createServerClient(url, key, { cookies })`
 *      and swap `SupabaseServerClientStub` for the real `SupabaseClient` type.
 */

export type SupabaseServerClientStub = {
  /** Marks this as the placeholder, so a forgotten stub fails loudly. */
  readonly __stub: true;
};

export async function createClient(): Promise<SupabaseServerClientStub> {
  throw new Error(
    "Supabase is not configured. app/supabase/server.ts is a placeholder — see the TODO in that file.",
  );
}
