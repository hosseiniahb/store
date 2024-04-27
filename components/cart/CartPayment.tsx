"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCart } from "@/lib/store/cart.store";
import { useEffect } from "react";

export default function CartPayment() {
  const { total, setTotal, cartItems } = useCart();

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
      <Button>Checkout</Button>
    </div>
  );
}
