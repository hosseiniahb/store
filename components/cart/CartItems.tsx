"use client";

import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartPayment from "./CartPayment";
import { getAllCartItem } from "@/lib/actions/user/cart.actions";
import Loading from "../Loading";
import { useCart } from "@/lib/store/cart.store";

export default function CartItems() {
  const { cartItems, setCartItems } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDataCart = async () => {
      setIsLoading(true);
      const response = await getAllCartItem();
      const { data, error } = JSON.parse(response!);

      if (error) {
        setIsLoading(false);
        setCartItems([]);
        return;
      }
      setCartItems(data);
      setIsLoading(false);
    };

    getDataCart();
  }, []);

  return (
    <div className="w-full pt-3 flex flex-col">
      <div className="w-full flex flex-col gap-3">
        {isLoading ? (
          <Loading />
        ) : cartItems.length ? (
          cartItems.map((product, index) => (
            <CartItem key={index} {...product} />
          ))
        ) : (
          <div className="w-full h-[90vh] flex items-center justify-center">
            <h1>Your cart is empty.</h1>
          </div>
        )}
      </div>
      {cartItems.length > 0 && <CartPayment />}
    </div>
  );
}
