"use client";

import { I_Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { ProductItemsSkeleton } from "../Skeleton";
import ProductItem from "./ProductItem";

export default function RelatedProducts({ productId }: { productId: string }) {
  const [productsData, setProductsData] = useState<Array<I_Product>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/products/related-products/${productId}`
      );
      const { data, error } = await response.json();
      if (error) {
        setIsLoading(false);
        console.log(error);
        return;
      }
      setIsLoading(false);
      setProductsData(data);
    };
    getProductsData();
  }, []);

  return (
    <section className="mx-auto w-10/12 py-6">
      <h1 className="text-xl sm:text-3xl font-bold">Related Products</h1>
      <div className="w-full flex gap-3 items-start py-3 mt-6">
        {isLoading ? (
          <ProductItemsSkeleton />
        ) : productsData.length ? (
          productsData.map((product: I_Product) => (
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
          <p className="mx-auto font-semibold my-8 md:my-0">
            Unfortunately, no products were found.
          </p>
        )}
      </div>
    </section>
  );
}
