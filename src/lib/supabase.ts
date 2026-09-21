import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseUrl.includes("your-project-id")
  );
};

// Browser / client-side client
// Safe fallback prevents next build / module evaluation from crashing when env vars are unset
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: typeof window !== "undefined",
    },
  }
);

// Server-side admin client (uses service role key — NEVER expose to browser)
export function createServerClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!isSupabaseConfigured() || !serviceRoleKey || serviceRoleKey.includes("your-service-role-key")) {
    throw new Error(
      "Supabase credentials are not fully configured. " +
        "Please check NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type { SupabaseClient } from "@supabase/supabase-js";
