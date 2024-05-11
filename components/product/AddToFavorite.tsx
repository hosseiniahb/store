"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { addToFavoriteProduct } from "@/lib/actions/user/products.actions";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/store/user.store";
import { toast } from "../ui/use-toast";

export default function AddToFavorite({ productId }: { productId: string }) {
  const { user, setUser } = useUser();
  const [isPending, startTransition] = useTransition();

  const handleAddToProductFavorite = () => {
    try {
      startTransition(async () => {
        if (user?.id) {
          const response = await addToFavoriteProduct(productId);
          const { data } = JSON.parse(response!);

          if (data === "CREATE") {
            let addProductToFavorite: string[] = [];
            if (user?.favorite_list) {
              addProductToFavorite = [...user?.favorite_list!, productId];
            } else {
              addProductToFavorite.push(productId);
            }

            setUser({ ...user!, favorite_list: addProductToFavorite });
          }

          if (data === "REMOVE") {
            const removeProductToFavorite = user?.favorite_list?.filter(
              (id) => {
                return id !== productId;
              }
            );
            setUser({ ...user!, favorite_list: removeProductToFavorite! });
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleAddToProductFavorite}
      disabled={isPending}
      variant="ghost"
      size="icon"
      className="p-0 w-9 h-9"
    >
      <Heart
        size={16}
        className={cn("stroke-red-600", {
          "fill-red-500": user?.favorite_list?.includes(productId),
        })}
      />
    </Button>
  );
}
