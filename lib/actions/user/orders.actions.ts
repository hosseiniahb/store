"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export async function getUserOrderItems() {
  try {
    const supabase = await createSupabaseServerClient();

    const getUser = await supabase.auth.getUser();

    const userId = getUser.data.user?.id;

    if (!userId) {
      return JSON.stringify({ error: { message: "user is not found." } });
    }

    const getOrderDetails = await supabase
      .from("order_details")
      .select(
        "id, payment_details(id, order_id, amount,provider , status, created_at)"
      )
      .match({ user_id: userId })
      .order("created_at", { ascending: false });

    return JSON.stringify(getOrderDetails);
  } catch (error) {
    console.log(error);
  }
}

export async function getOrderProductItems(orderId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const getOrderItems = await supabase
      .from("order_items")
      .select("quantity, products(id, image_url, title, price)")
      .match({ order_id: orderId })
      .order("created_at", { ascending: false });

    return JSON.stringify(getOrderItems);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInformationByOrderId(orderId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const getOrderItems = await supabase
      .from("order_details")
      .select("user_id")
      .match({ id: orderId })
      .single();

    if (getOrderItems.error) {
      return JSON.stringify(getOrderItems);
    }
    const { user_id } = getOrderItems.data;

    const getUserAddress = await supabase
      .from("user_address")
      .select(
        "address, city, postal_code, country, telephone, mobile, users(user_name)"
      )
      .match({ user_id: user_id })
      .single();

    return JSON.stringify(getUserAddress);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserOrderBill(orderId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const getPaymentDetails = await supabase
      .from("payment_details")
      .select("amount, status")
      .match({ order_id: orderId })
      .single();

    return JSON.stringify(getPaymentDetails);
  } catch (error) {
    console.log(error);
  }
}
