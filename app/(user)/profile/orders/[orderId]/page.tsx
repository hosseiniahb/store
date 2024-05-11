import OrderInformation from "@/components/user/orders/OrderInformation";

export default function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-500">
          Invoice order
        </h1>
      </div>
      <OrderInformation orderId={params.orderId} />
    </div>
  );
}
