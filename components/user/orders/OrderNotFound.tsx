import Image from "next/image";

export default function OrderNotFound() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="/images/orders/shopping-bag.svg"
          alt="shopping bag image"
          width={100}
          height={100}
          className="object-cover dark:stroke-white"
        />
        <p className="font-semibold text-sm text-gray-600">
          There are no orders.
        </p>
      </div>
    </div>
  );
}
