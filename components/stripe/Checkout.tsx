"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCart } from "@/lib/store/cart.store";
import { FormEvent, useEffect, useTransition } from "react";
import { useUser } from "@/lib/store/user.store";
import { checkout } from "@/lib/stripe/Stripe";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { total, setTotal, cartItems } = useCart();
  const { user } = useUser();

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (user?.id) {
        startTransition(async () => {
          const resultCheckout = await checkout(user?.email, cartItems);
          if (resultCheckout) {
            const data = JSON.parse(resultCheckout!);

            const stripe = await loadStripe(
              process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );

            const { error }: any = await stripe?.redirectToCheckout({
              sessionId: data.id,
            });
            if (error) {
              router.push(process.env.FAILED_PAYMENT_STRIPE_PATH || "/");
            }
            return;
          }
          return;
        });
      } else {
        toast({
          title: "Authentication",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Please log in to your account first.
              </code>
            </pre>
          ),
        });
      }
    } catch (error) {
      console.log("Payment fail.");
    }
  };

  useEffect(() => {
    let newTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * curr.products.price;
    }, 0);

    setTotal(newTotal);
  }, []);

  return (
    <div className="w-full h-28 flex flex-col gap-3 absolute bottom-0 right-0 px-3 py-5 bg-slate-50 dark:bg-slate-900 rounded-t-xl">
      <div className="w-full flex items-center justify-between">
        <h3 className="font-bold">Total : </h3>
        <p className="text-sm font-bold">{formatPrice(total)}</p>
      </div>
      <form
        onSubmit={handleCheckout}
        aria-disabled={isPending}
        className="w-full"
      >
        <Button
          disabled={isPending}
          className="w-full flex items-center transition-all"
        >
          {isPending && <Loader size={18} className="animate-spin mr-2" />}
          Checkout
        </Button>
      </form>
    </div>
  );
}
