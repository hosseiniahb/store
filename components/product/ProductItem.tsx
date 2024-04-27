import Image from "next/image";
import Link from "next/link";
import AddToFavorite from "./AddToFavorite";
import { formatPrice } from "@/lib/utils";
import ActionToCart from "./ActionToCart";

type ProductItemProps = {
  id: string;
  title: string;
  image_url: string;
  price: number;
  count: number;
};

export default function ProductItem({
  id,
  title,
  image_url,
  price,
  count,
}: ProductItemProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 max-w-[220px] min-h-[224px] bg-accent rounded-lg p-2">
      <div className="relative rounded-lg overflow-hidden">
        <Link href={`/product/${id}`} className="group">
          <Image
            alt="product picture"
            src={image_url}
            width={212}
            height={206}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center rounded-lg transition-all group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 left-2 p-0 w-9 h-9">
          <AddToFavorite productId={id} />
        </div>
      </div>
      <div className="w-full flex items-center justify-between ">
        <Link href={`/product/${id}`}>
          <h3 className="py-1 font-semibold transition-all hover:text-primary">
            {title}
          </h3>
        </Link>
      </div>
      <div className="w-full flex items-center justify-between border-t dark:border-slate-700 py-2 gap-5">
        {count ? (
          <ActionToCart type="ADD" productId={id} children="Add To Cart" />
        ) : (
          <p className="w-full text-center h-10 px-4 pt-3 text-red-500 text-sm font-bold">
            not available
          </p>
        )}
        <p className="font-bold text-slate-700 dark:text-slate-300">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
}
