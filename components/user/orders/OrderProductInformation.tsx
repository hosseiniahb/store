"use client";

import { ColumnOrderProductTable } from "@/components/DataTableColumns";
import { DataTableSkeleton } from "@/components/Skeleton";
import { DataTable } from "@/components/ui/DataTable";
import { getOrderProductItems } from "@/lib/actions/user/orders.actions";
import { useEffect, useState } from "react";

export default function OrderProductInformation({
  orderId,
}: {
  orderId: string;
}) {
  const [orderProductItems, setOrderProductItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getOrderProduct = async () => {
      const response = await getOrderProductItems(orderId);
      const { data } = JSON.parse(response!);

      if (data && data.length) {
        setIsLoading(false);
        setOrderProductItems(data);
        return;
      }

      setIsLoading(false);
    };
    getOrderProduct();
  }, []);
  return (
    <div className="w-full mb-8">
      <h2 className="text-primary mt-5 font-semibold ">Product Information</h2>
      <div className="w-full flex flex-col gap-5 text-sm">
        {isLoading ? (
          <DataTableSkeleton />
        ) : orderProductItems.length ? (
          <DataTable
            columns={ColumnOrderProductTable}
            data={orderProductItems}
          />
        ) : (
          <p className="mx-auto font-semibold my-8 md:my-0">
            Unfortunately, no products were found.
          </p>
        )}
      </div>
    </div>
  );
}
