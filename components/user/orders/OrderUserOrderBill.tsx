"use client";

import { OrderBillSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { getUserOrderBill } from "@/lib/actions/user/orders.actions";
import { T_OrderBill } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderUserOrderBill({ orderId }: { orderId: string }) {
  const [orderBill, setOrderBill] = useState<T_OrderBill>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getOrderProduct = async () => {
      const response = await getUserOrderBill(orderId);
      const { data } = JSON.parse(response!);

      if (data) {
        setIsLoading(false);
        setOrderBill(data);
        return;
      }

      setIsLoading(false);
    };
    getOrderProduct();
  }, []);
  return (
    <div className="w-full md:w-72 mb-8">
      {isLoading ? (
        <OrderBillSkeleton />
      ) : orderBill ? (
        <div className="w-full p-3 shadow-md rounded-lg dark:shadow-slate-800">
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={
                orderBill.status === "paid"
                  ? "/images/message/circle-check.svg"
                  : "/images/message/triangle-alert.svg"
              }
              width={50}
              height={50}
              alt="status payment picture"
              className="object-cover object-center"
            />
            <p
              className={cn("font-semibold text-sm mt-5 text-center", {
                "text-green-500": orderBill.status === "paid",
                "text-red-500": orderBill.status === "unpaid",
              })}
            >
              {orderBill.status === "paid"
                ? "Payment was successful."
                : "Payment has not been made successfully."}
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 mt-10">
            <p className="flex items-center justify-between font-semibold text-sm">
              Total : <span>{formatPrice(orderBill.amount)}</span>
            </p>
            <Button onClick={() => window.print()} className="mt-3">
              Print Order
            </Button>
          </div>
        </div>
      ) : (
        <p className="mx-auto font-semibold my-8 md:my-0">
          Unfortunately, no products were found.
        </p>
      )}
    </div>
  );
}
