// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ADMIN_EMAIL = "admin@kalaveeryam.local";
const DEFAULT_PASSWORD = "shanukpshan1";

serve(async (_req) => {
  try {
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Check if admin user exists
    const { data: users, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });
    if (listErr) throw listErr;

    const exists = users?.users?.some((u: any) => u.email === ADMIN_EMAIL);

    if (!exists) {
      // Create admin user
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
      });
      if (createErr) throw createErr;

      const userId = created.user?.id;
      if (userId) {
        // Assign admin role
        const { error: roleErr } = await admin
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        if (roleErr && roleErr.code !== "23505") { // ignore unique violation
          throw roleErr;
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      headers: { "content-type": "application/json" },
      status: 500,
    });
  }
});