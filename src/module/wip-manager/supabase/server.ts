import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

export type SupabaseClientType = SupabaseClient<Database>;

export function createClientOnServer(): SupabaseClientType {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // 서버에서는 세션 유지 불필요
      },
    }
  );
}
