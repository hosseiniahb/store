"use client";

import ProductItem from "@/components/product/ProductItem";
import { ProductItemsSkeleton } from "@/components/Skeleton";
import { getUserFavoriteProduct } from "@/lib/actions/user/products.actions";
import { useUser } from "@/lib/store/user.store";
import { I_Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ProductFavoritesList() {
  const { user } = useUser();
  const [favoriteList, setFavoriteList] = useState<Array<I_Product>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (user?.id) {
      const getFavoriteList = async () => {
        const response = await getUserFavoriteProduct();
        const { data } = JSON.parse(response!);

        if (data.length) {
          setIsLoading(false);
          setFavoriteList(data);
          return;
        }

        setIsLoading(false);
      };
      getFavoriteList();
    }
  }, [user?.favorite_list]);

  return (
    <div className="w-full flex flex-wrap gap-2">
      {isLoading ? (
        <ProductItemsSkeleton />
      ) : favoriteList.length ? (
        favoriteList.map((product: I_Product) => (
          <ProductItem
            key={product.id}
            id={product.id!}
            image_url={product.image_url}
            title={product.title}
            price={product.price}
            count={product.count}
          />
        ))
      ) : (
        <p className="mx-auto text-center font-semibold mt-20 md:my-0 md:mx-0 md:text-sm md:px-3">
          No products have been added to the wishlist.
        </p>
      )}
    </div>
  );
}
