import Loading from "@/components/Loading";
import OrdersUserTable from "@/components/user/orders/OrdersUserTable";
import { Suspense } from "react";

export default function Orders() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-500">Order Management</h1>
      </div>
      <div className="w-full my-6">
        <Suspense fallback={<Loading />}>
          <OrdersUserTable/>
        </Suspense>
      </div>
    </div>
  );
}
