"use server";

import Stripe from "stripe";
import { createSupabaseServerClient } from "../supabase";
import { T_CartItem } from "../types";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

export async function checkout(email: string, cart_items: T_CartItem[]) {
  try {
    const supabase = await createSupabaseServerClient();

    const getUser = await supabase.auth.getUser();

    if (getUser.error) {
      return JSON.stringify(getUser);
    }

    const userId = getUser.data.user.id;

    if (userId && cart_items.length) {
      const extractingItems = cart_items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.products.price * 100,
          product_data: {
            name: item.products.title,
            images: [item.products.image_url],
          },
        },
      }));

      const resultCheckout = await stripe.checkout.sessions.create({
        success_url: `${process.env.SITE_URL}/payment/successful-payment`,
        cancel_url: `${process.env.SITE_URL}/payment/payment-failed`,
        customer_email: email,
        mode: "payment",
        payment_method_types: ["card"],
        currency: "usd",
        line_items: extractingItems,
        metadata: {
          user_id: userId,
          email,
        },
      });

      return JSON.stringify(resultCheckout);
    }
  } catch (error) {
    console.log(error);
  }
}
