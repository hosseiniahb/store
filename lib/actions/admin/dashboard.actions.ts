"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

const DASHBOARD_PATH = "/dashboard";

export async function getDashboardCardData() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultProductsCount = (await supabase.from("products").select("id"))
      .data?.length;
    const resultOrdersCount = (await supabase.from("order_items").select("id"))
      .data?.length;
    const resultUsersCount = (await supabase.from("users").select("id")).data
      ?.length;

    return JSON.stringify([
      resultProductsCount,
      resultOrdersCount,
      resultUsersCount,
    ]);
  } catch (error) {
    console.log(error);
  }
}

export async function getDashboardRecentSales() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUserPayment = await supabase
      .from("payment_details")
      .select("*")
      .single();

    if (resultUserPayment?.error) {
      return JSON.stringify(resultUserPayment);
    }

    return JSON.stringify(resultUserPayment);
  } catch (error) {
    console.log(error);
  }
}
