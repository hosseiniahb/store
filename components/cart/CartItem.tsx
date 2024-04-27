import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { I_Product } from "@/lib/types";
import CartActions from "./CartActions";

type CartItem = {
  quantity: number;
  products: I_Product;
};

export default function CartItem({ quantity, products }: CartItem) {
  const { id, title, price, image_url } = products;

  return (
    <div className="w-full h-24 flex justify-between shadow-md rounded-lg py-1">
      <Link href={`/product/${id}`} className="w-4/12 h-full relative">
        <Image
          alt="product cart"
          src={image_url}
          fill
          className="object-cover rounded-lg"
        />
      </Link>
      <div className="w-5/12 flex flex-col gap-2 ml-2">
        <Link href={`/product/${id}`} className="text-sm font-semibold">
          {title.length > 15 ? `${title.slice(0, 15)}...` : title}
        </Link>
        <p className="text-sm">{formatPrice(price)}</p>
      </div>
      <div className="w-3/12 flex flex-col items-end justify-between">
        <CartActions id={id!} quantity={quantity} />
      </div>
    </div>
  );
}
