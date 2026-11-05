import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Create Supabase client with service role
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { user_id, plan_type } = await request.json();

    if (!user_id || !plan_type) {
      return NextResponse.json(
        { error: "Missing user_id or plan_type" },
        { status: 400 }
      );
    }

    console.log("Setting up subscription for user:", user_id);

    // First, try to create the table if it doesn't exist
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS public.subscriptions (
        id BIGSERIAL PRIMARY KEY,
        user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
        plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'sixmonth', 'annual')),
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
        current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
        cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
      CREATE POLICY "Users can view their own subscription"
        ON public.subscriptions FOR SELECT
        USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Service role can do everything" ON public.subscriptions;
      CREATE POLICY "Service role can do everything"
        ON public.subscriptions
        FOR ALL
        USING (current_setting('role') = 'service_role')
        WITH CHECK (current_setting('role') = 'service_role');
    `;

    // Execute raw SQL using service role
    const { data: sqlResult, error: sqlError } = await supabase.rpc(
      "exec",
      { query: createTableSql }
    ).then(
      (result) => result,
      (error) => ({
        data: null,
        error: error,
      })
    );

    console.log("Table creation result:", sqlResult, sqlError);

    // Now insert/update the subscription
    const { data, error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id,
          plan_type,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancel_at_period_end: false,
        },
        {
          onConflict: "user_id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Subscription upsert error:", error);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log("Subscription created:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
