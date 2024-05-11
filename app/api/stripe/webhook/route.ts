import { headers } from "next/headers";
import Stripe from "stripe";
import { buffer } from "node:stream/consumers";
import { createSupabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);
const endpointSecret = process.env.ENDPOINT_SECRET!;

export async function POST(request: any) {
  const rowBody = await buffer(request.body);

  let event;

  try {
    const sig = headers().get("stripe-signature");
    event = stripe.webhooks.constructEvent(rowBody, sig!, endpointSecret);
  } catch (err: any) {
    return Response.json({ error: "Webhook error" + err.message });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const { id, payment_status, status, metadata } = checkoutSessionCompleted;
      if (metadata && payment_status === "paid" && status === "complete") {
        const { user_id } = metadata;
        await onSuccessPayment(user_id, id, payment_status);
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({});
}

// success payment handler
async function onSuccessPayment(
  userId: string,
  paymentId: string,
  payment_status: string
) {
  try {
    const created_at = new Date().toISOString();
    const modified_at = new Date().toISOString();
    const supabaseAdmin = await createSupabaseAdmin();

    if (!userId) {
      return JSON.stringify({ error: { message: "user not found." } });
    }

    const getShoppingSession = await supabaseAdmin
      .from("shopping_session")
      .select("id, total")
      .match({ user_id: userId })
      .single();

    if (getShoppingSession.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const { id: sessionId, total } = getShoppingSession.data;

    const createOrderDetails = await supabaseAdmin
      .from("order_details")
      .insert({
        total,
        user_id: userId,
        payment_id: paymentId,
        created_at,
        modified_at,
      })
      .select("id, total, payment_id")
      .single();

    if (createOrderDetails.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const { id, total: amount, payment_id } = createOrderDetails.data;
    const createPaymentDetails = await supabaseAdmin
      .from("payment_details")
      .insert({
        id: payment_id,
        order_id: id,
        amount,
        provider: "stripe",
        status: payment_status,
        created_at,
        modified_at,
      });

    if (createPaymentDetails.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const getCartItem = await supabaseAdmin
      .from("cart_item")
      .select("product_id, quantity")
      .match({ session_id: sessionId });

    if (getCartItem.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const orderItems = getCartItem.data.map((cartItem) => ({
      quantity: cartItem.quantity,
      product_id: cartItem.product_id,
      order_id: createOrderDetails.data.id,
      created_at,
      modified_at,
    }));

    const createOrderItem = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (createOrderItem.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const deleteShoppingSession = await supabaseAdmin
      .from("shopping_session")
      .delete()
      .match({ user_id: userId });

    if (deleteShoppingSession.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    const deleteCartItem = await supabaseAdmin
      .from("cart_item")
      .delete()
      .match({ session_id: sessionId });

    if (deleteCartItem.error) {
      return JSON.stringify({ error: { message: "payment fail." } });
    }

    return { data: "successfully create order item" };
  } catch (error) {
    return JSON.stringify({ error: { message: "payment fail.112" } });
  }
}
