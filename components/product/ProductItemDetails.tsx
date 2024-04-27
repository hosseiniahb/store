"use client";

import Image from "next/image";
import AddToCart from "./ActionToCart";
import { useEffect, useState } from "react";
import { I_Product } from "@/lib/types";
import { ProductItemDetailsSkeleton } from "../Skeleton";
import { formatPrice } from "@/lib/utils";
import AddToFavorite from "./AddToFavorite";
import Link from "next/link";

export default function ProductItemDetails({
  productId,
}: {
  productId: string;
}) {
  const [productData, setProductData] = useState<I_Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const { data, error } = await response.json();
      if (error) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setProductData(data);
    };
    getProduct();
  }, []);

  return (
    <section className="w-full">
      {isLoading ? (
        <ProductItemDetailsSkeleton />
      ) : productData ? (
        <div
          className="w-full my-10 flex flex-col items-start gap-3 md:flex-row md:justify-center md:h-[550px]"
          key={productData.id}
        >
          <div className="flex relative flex-col w-full md:w-3/6 md:h-full min-h-[430px] gap-2">
            <Image
              src={productData?.image_url}
              alt="product image"
              priority
              width={600}
              height={500}
              className="rounded-lg object-cover object-center"
            />
            <div className="w-full flex flex-row min-h-2/4 gap-2">
              <div className="relative w-36 h-28">
                <Image
                  src="/images/products/airpods-max.jpg"
                  alt="product image"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
              <div className="relative w-36 h-28">
                <Image
                  src="/images/products/airpods-max.jpg"
                  alt="product image"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
              <div className="relative w-36 h-28">
                <Image
                  src="/images/products/airpods-max.jpg"
                  alt="product image"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
              <div className="relative w-36 h-28">
                <Image
                  src="/images/products/airpods-max.jpg"
                  alt="product image"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-3 flex flex-col items-start justify-between md:w-2/6 md:h-[390px] md:mt-0">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AddToFavorite productId={productData.id!} />
                <h1 className="text-4xl font-bold">{productData?.title}</h1>
              </div>
              <p className="py-2 font-bold">
                {formatPrice(Number(productData?.price))}
              </p>
            </div>
            <div className="flex flex-col mt-10 gap-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-400">
                Brand :{" "}
                <Link
                  href={`/search?brand=${productData.title}`}
                  className="text-primary"
                >
                  Apple
                </Link>
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-400">
                Type :{" "}
                <Link
                  href={`/search?type=${productData.title}`}
                  className="text-primary"
                >
                  Earphone
                </Link>
              </p>
              <p className="py-10">{productData?.description}</p>
            </div>
            <AddToCart
              type="ADD"
              productId={productData?.id!}
              children="Add To Cart"
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <p className="mx-auto font-semibold my-8 md:my-0">
          Unfortunately, no products were found.
        </p>
      )}
    </section>
  );
}
