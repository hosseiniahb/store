import OrderProductInformation from "./OrderProductInformation";
import OrderUserInformation from "./OrderUserInformation";
import OrderUserOrderBill from "./OrderUserOrderBill";

export default function OrderInformation({ orderId }: { orderId: string }) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col-reverse md:flex-row items-start">
        <OrderUserInformation orderId={orderId} />
        <OrderUserOrderBill orderId={orderId} />
      </div>
      <OrderProductInformation orderId={orderId} />
    </div>
  );
}
