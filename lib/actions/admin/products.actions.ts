"use server";

import { ProductFormSchemaType } from "@/lib/schema";
import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const DASHBOARD_PATH_PRODUCTS = "/dashboard/products";

export async function getAllProducts() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultProducts = await supabase
      .from("products")
      .select(`id, title, description, price, created_at, modified_at, count`)
      .order("created_at", { ascending: false });

    return JSON.stringify(resultProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function createNewProduct(data: ProductFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();
    const created_at = new Date().toISOString();
    const modified_at = new Date().toISOString();
    const resultProduct = await supabase
      .from("products")
      .insert({ ...data, created_at, modified_at })
      .select("inventory_id")
      .single();

    revalidatePath(DASHBOARD_PATH_PRODUCTS);
    return JSON.stringify(resultProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(productId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("products")
      .select(`title ,description ,price ,image_url, count, category_id`)
      .eq("id", productId)
      .single();

    revalidatePath(DASHBOARD_PATH_PRODUCTS);
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function editProductById(
  productId: string,
  data: ProductFormSchemaType
) {
  try {
    const supabase = await createSupabaseServerClient();

    const modified_at = new Date().toISOString();
    const resultProduct = await supabase
      .from("products")
      .update({ ...data, modified_at })
      .match({ id: productId });

    revalidatePath(DASHBOARD_PATH_PRODUCTS);
    return JSON.stringify(resultProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductById(productId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultProduct = await supabase
      .from("products")
      .delete()
      .match({ id: productId });

    revalidatePath(DASHBOARD_PATH_PRODUCTS);
    return JSON.stringify(resultProduct);
  } catch (error) {
    console.log(error);
  }
}
