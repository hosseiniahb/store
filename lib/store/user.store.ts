import { create } from "zustand";
import { I_User } from "@/lib/types/index";
interface UserState {
  user: I_User | null;
  setUser: (user: I_User | null) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
