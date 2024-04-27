"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const PROFILE_PATH_ORDERS = "/profile/orders";

export async function getOrdersUser() {
  try {
    const supabase = await createSupabaseServerClient();

    const getUser = await supabase.auth.getUser();

    const userId = getUser.data.user?.id;

    if (!userId) {
      revalidatePath(PROFILE_PATH_ORDERS);
      return JSON.stringify({ error: { message: "user is not found." } });
    }

    const getShoppingSession = await supabase
      .from("shopping_session")
      .select("total")
      .match({ user_id: userId })
      .single();

    if (getShoppingSession.error) {
      return JSON.stringify(getShoppingSession);
    }

    const { total } = getShoppingSession.data;

    if (total) {
      const getOrderItem = await supabase
        .from("order_details")
        .select("id, payment_id")
        .match({ user_id: userId })
        .single();

      console.log(getOrderItem);

      if (getOrderItem.error) {
        return JSON.stringify(getOrderItem);
      }

      const getPaymentDetails = await supabase
        .from("payment_details")
        .select("status, amount, provider")
        .match({ id: getOrderItem.data.payment_id })
        .single();

      console.log(getPaymentDetails);

      return JSON.stringify(getPaymentDetails);
    }

    return JSON.stringify({ error: { message: "order not found." } });
  } catch (error) {
    console.log(error);
  }
}
