/**
 * Browser-side Supabase client — PLACEHOLDER.
 *
 * This build has no database. The file exists so the wiring has an obvious
 * home later, and so nothing has to be moved when it arrives.
 *
 * TODO: when Supabase is added —
 *   1. npm install @supabase/supabase-js @supabase/ssr
 *   2. set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   3. replace the body below with `createBrowserClient(url, anonKey)`
 *      and swap `SupabaseClientStub` for the real `SupabaseClient` type.
 */

export type SupabaseClientStub = {
  /** Marks this as the placeholder, so a forgotten stub fails loudly. */
  readonly __stub: true;
};

export function createClient(): SupabaseClientStub {
  throw new Error(
    "Supabase is not configured. app/supabase/client.ts is a placeholder — see the TODO in that file.",
  );
}
