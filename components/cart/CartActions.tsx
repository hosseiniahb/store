import { useTransition } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCart } from "@/lib/store/cart.store";
import { deleteProductInCart } from "@/lib/actions/user/cart.actions";
import { T_CartItem } from "@/lib/types";
import { Minus, Plus, Trash } from "lucide-react";
import ActionToCart from "../product/ActionToCart";

export default function CartActions({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();
  const { cartItems, setCartItems, count, setCount, total, setTotal } =
    useCart();

  const deleteCartItem = () => {
    try {
      startTransition(async () => {
        const response = await deleteProductInCart(id!);
        const { error } = JSON.parse(response!);

        if (!error) {
          const updatedCartItems = cartItems.filter((product) => {
            return product.products.id !== id;
          });

          let newTotal = updatedCartItems.reduce((acc, curr) => {
            return acc + curr.quantity * curr.products.price;
          }, 0);

          let quantity = updatedCartItems.reduce(
            (acc: number, curr: T_CartItem) => {
              return acc + curr.quantity;
            },
            0
          );

          setCartItems(updatedCartItems);
          setTotal(newTotal);
          setCount(quantity);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={deleteCartItem}
        disabled={isPending}
        size="icon"
        variant="ghost"
        className="px-2 text-red-500 hover:text-red-500"
      >
        <Trash size={17} />
      </Button>
      <div className="flex items-center gap-2">
        <ActionToCart
          type="ADD"
          productId={id!}
          variant="ghost"
          children={<Plus size={17} />}
          className="px-2"
        />
        <Badge className="text-xm" variant="secondary">
          {quantity}
        </Badge>
        <ActionToCart
          type="REMOVE"
          productId={id!}
          variant="ghost"
          children={<Minus size={17} />}
          className="px-2"
        />
      </div>
    </>
  );
}
