"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getQuantityCartItems } from "@/lib/actions/user/cart.actions";
import { useCart } from "@/lib/store/cart.store";

import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import CartItems from "./CartItems";

export default function Cart() {
  const { count, setCount, cartItems } = useCart();

  useEffect(() => {
    const getQuantityCart = async () => {
      const response = await getQuantityCartItems();
      const data = JSON.parse(response!) as Array<Record<string, number>>;
      if (data.length) {
        let quantity = data.reduce(
          (acc: number, curr: Record<string, number>) => {
            return acc + curr.quantity;
          },
          0
        );

        setCount(quantity);
      }
    };
    getQuantityCart();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="relative">
        <ShoppingCart size={20} />
        {count > 0 && (
          <span className="text-xs font-semibold absolute -top-3 -right-4  py-1 px-2 bg-primary rounded-full text-white">
            {count}
          </span>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <CartItems />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
