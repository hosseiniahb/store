"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

const DASHBOARD_PATH_ORDERS = "/dashboard/orders";

export async function getAllOrders() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultOrders = await supabase
      .from("order_details")
      .select(
        `id, total, created_at,
        users(
            user_name
        ),
        payment_details(
            status
        )`
      )
      .order("created_at", { ascending: false });

    return JSON.stringify(resultOrders);
  } catch (error) {
    console.log(error);
  }
}
