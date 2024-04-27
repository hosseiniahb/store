"use client";

import { I_Product } from "@/lib/types";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { ProductItemsSkeleton } from "@/components/Skeleton";
import { useSearchParams } from "next/navigation";

export default function ProductItems() {
  const [productsData, setProductsData] = useState<Array<I_Product>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectQuery: Record<string, string> = {};

  searchParams.forEach((value: string, key: string) => {
    selectQuery[key] = value;
  });

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/products?${searchParams}`);
      const { data, error } = await response.json();

      if (error) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setProductsData(data);
    };
    getProductsData();
  }, [searchParams]);

  return (
    <>
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
    </>
  );
}
