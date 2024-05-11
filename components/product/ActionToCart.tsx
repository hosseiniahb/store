"use client";
import { ReactNode, useTransition } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "../ui/use-toast";
import { addToCart, removeToCart } from "@/lib/actions/user/cart.actions";
import { useCart } from "@/lib/store/cart.store";
import { useUser } from "@/lib/store/user.store";

type ActionToCartProps = {
  productId: string;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  className?: string;
  type: "ADD" | "REMOVE";
};

export default function ActionToCart({
  productId,
  children,
  variant = "default",
  className,
  type,
}: ActionToCartProps) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const {
    count,
    increaseCount,
    decreaseCount,
    cartItems,
    setCartItems,
    total,
    setTotal,
  } = useCart();

  const handleActionToCart = () => {
    try {
      if (user?.id) {
        if (type === "ADD") {
          startTransition(async () => {
            const result = await addToCart(productId);
            const { error } = JSON.parse(result!);

            if (error) {
              toast({
                title: "Fail to add to cart.",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(error.message)}
                    </code>
                  </pre>
                ),
              });
              return;
            } else {
              increaseCount(count);
              const increaseQuantityCart = cartItems.map((product) => {
                if (product.products.id === productId) {
                  product.quantity += 1;
                  return product;
                }
                return product;
              });
              let newTotal = increaseQuantityCart.reduce((acc, curr) => {
                return acc + curr.quantity * curr.products.price;
              }, 0);

              setTotal(newTotal);
              setCartItems(increaseQuantityCart);
              toast({
                title: "Successfully to add to cart ",
              });
              return;
            }
          });
        }

        if (type === "REMOVE") {
          startTransition(async () => {
            const result = await removeToCart(productId);
            const { error } = JSON.parse(result!);

            if (error) {
              toast({
                title: "Fail to remove to cart.",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(error.message)}
                    </code>
                  </pre>
                ),
              });
              return;
            } else {
              decreaseCount(count);
              const updatedCartItems = cartItems
                .map((product) => {
                  if (product.products.id === productId) {
                    product.quantity -= 1;
                    setTotal(total - product.products.price);
                    return product;
                  }
                  return product;
                })
                .filter((product) => {
                  if (product.quantity === 0) {
                    return product.products.id !== productId;
                  }
                  return product;
                });

              setCartItems(updatedCartItems);
              toast({
                title: "Successfully to remove to cart.",
              });
              return;
            }
          });
        }
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
      console.log(error);
    }
  };

  {
    return (
      <Button
        variant={variant}
        disabled={isPending}
        onClick={handleActionToCart}
        className={className}
      >
        {isPending ? <Loader size={18} className="animate-spin" /> : children}
      </Button>
    );
  }
}
