import { create } from "zustand";
import { T_CartItem } from "../types";

interface CartState {
  count: number;
  total: number;
  cartItems: T_CartItem[];
  setCartItems: (cartItems: T_CartItem[]) => void;
  setCount: (count: number) => void;
  setTotal: (total: number) => void;
  increaseCount: (count: number) => void;
  decreaseCount: (count: number) => void;
}

export const useCart = create<CartState>()((set) => ({
  count: 0,
  total: 0,
  cartItems: [],
  setCartItems: (cartItems) => set(() => ({ cartItems })),
  setCount: (newCount) => set(() => ({ count: newCount })),
  setTotal: (newTotal) => set(() => ({ total: newTotal })),
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));
