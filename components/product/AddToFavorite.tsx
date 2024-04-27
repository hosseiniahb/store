"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { addToFavoriteProduct } from "@/lib/actions/user/products.actions";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/store/user.store";

export default function AddToFavorite({ productId }: { productId: string }) {
  const { user, setUser } = useUser();
  const [isPending, startTransition] = useTransition();

  const handleAddToProductFavorite = () => {
    startTransition(async () => {
      try {
        const response = await addToFavoriteProduct(productId);
        const { data } = JSON.parse(response!);

        if (data === "CREATE") {
          const addProductToFavorite = [...user?.favorite_list!, productId];
          setUser({ ...user!, favorite_list: addProductToFavorite });
        }

        if (data === "REMOVE") {
          const removeProductToFavorite = user?.favorite_list?.filter((id) => {
            return id !== productId;
          });
          setUser({ ...user!, favorite_list: removeProductToFavorite! });
        }
      } catch (error) {
        console.log(error);
      }
    });
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
