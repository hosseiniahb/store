"use client";

import { ColumnOrderUserTable } from "@/components/DataTableColumns";
import { DataTableSkeleton } from "@/components/Skeleton";
import { DataTable } from "@/components/ui/DataTable";
import { getUserOrderItems } from "@/lib/actions/user/orders.actions";
import { useUser } from "@/lib/store/user.store";
import { useEffect, useState } from "react";
import OrderNotFound from "./OrderNotFound";

export default function OrdersUserTable() {
  const { user } = useUser();
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (user?.id) {
      const getOrderItems = async () => {
        const response = await getUserOrderItems();
        const { data } = JSON.parse(response!);

        if (data && data.length) {
          setIsLoading(false);
          setOrderItems(data);
          return;
        }

        setIsLoading(false);
      };
      getOrderItems();
    }
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-2">
      {isLoading ? (
        <DataTableSkeleton />
      ) : orderItems.length ? (
        <DataTable columns={ColumnOrderUserTable} data={orderItems} />
      ) : (
        <OrderNotFound />
      )}
    </div>
  );
}
