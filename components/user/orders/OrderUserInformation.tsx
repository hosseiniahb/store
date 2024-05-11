"use client";

import { OrderUserInformationSkeleton } from "@/components/Skeleton";
import { getUserInformationByOrderId } from "@/lib/actions/user/orders.actions";
import { T_UserAddress } from "@/lib/types";
import { useEffect, useState } from "react";

export default function OrderUserInformation({ orderId }: { orderId: string }) {
  const [userInformation, setUserInformation] = useState<T_UserAddress>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getUserInformation = async () => {
      const response = await getUserInformationByOrderId(orderId);
      const { data } = JSON.parse(response!);

      if (data) {
        setIsLoading(false);
        setUserInformation(data);
        return;
      }

      setIsLoading(false);
    };
    getUserInformation();
  }, []);
  return (
    <div className="w-full md:w-9/12">
      <h2 className="text-primary mt-5 font-semibold ">Buyer Information</h2>
      {isLoading ? (
        <OrderUserInformationSkeleton />
      ) : userInformation ? (
        <div className="w-full flex flex-col gap-5 text-sm px-2 py-10">
          <p className="font-semibold">
            Customer name :{" "}
            <span className="font-normal">
              {userInformation.users.user_name}
            </span>
          </p>
          <p className="font-semibold">
            Country :{" "}
            <span className="font-normal">{userInformation.country}</span>
          </p>
          <p className="font-semibold">
            City : <span className="font-normal">{userInformation.city}</span>
          </p>
          <p className="font-semibold">
            Address :{" "}
            <span className="font-normal">{userInformation.address}</span>
          </p>
          <p className="font-semibold">
            Postal Code :{" "}
            <span className="font-normal">{userInformation.postal_code}</span>
          </p>
          <p className="font-semibold">
            Telephone :{" "}
            <span className="font-normal">{userInformation.telephone}</span>
          </p>
          <p className="font-semibold">
            Mobile :{" "}
            <span className="font-normal">{userInformation.mobile}</span>
          </p>
        </div>
      ) : (
        <p className="mx-auto font-semibold my-8 md:my-0">
          Unfortunately, no products were found.
        </p>
      )}
    </div>
  );
}
