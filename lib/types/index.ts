import { Json } from "@/lib/types/supabase";

export interface I_Product {
  category_id?: string;
  count: number;
  created_at?: string;
  description?: string;
  image_url: string;
  id?: string;
  modified_at?: string;
  price: number;
  title: string;
}

export interface I_User {
  avatar_url: string;
  created_at: string | null;
  email: string;
  favorite_list: string[] | null;
  id: string | null;
  modified_at: string | null;
  phone: string | null;
  role: "user" | "admin";
  user_name: string;
}

export interface I_Category {
  id: string;
  name: string;
  created_at?: string;
  modified_at?: string;
}

export type T_User_Payment = {
  id: string;
  user_id: string;
  payment_type: string;
  provider: string;
  account_no: number;
  expiry: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type T_CartItem = { quantity: number; products: I_Product };
