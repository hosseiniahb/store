"use server";

import { CategoryFormSchemaType } from "@/lib/schema";
import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const DASHBOARD_PATH_CATEGORIES = "/dashboard/products";

export async function getAllCategories() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultCategories = await supabase
      .from("product_category")
      .select("id, name")
      .limit(5)
      .order("created_at", { ascending: false });

    return JSON.stringify(resultCategories);
  } catch (error) {
    console.log(error);
  }
}

export async function createNewCategory(data: CategoryFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();
    const created_at = new Date().toISOString();
    const modified_at = new Date().toISOString();
    const resultCategory = await supabase
      .from("product_category")
      .insert({ ...data, created_at, modified_at })
      .single();

    if (resultCategory.error) {
      return JSON.stringify(resultCategory);
    }

    revalidatePath(DASHBOARD_PATH_CATEGORIES);
    return JSON.stringify(resultCategory);
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product_category")
      .select(`id, name,description, created_at, modified_at`)
      .eq("id", categoryId)
      .single();

    revalidatePath(DASHBOARD_PATH_CATEGORIES);
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function editCategoryById(
  categoryId: string,
  data: CategoryFormSchemaType
) {
  try {
    const supabase = await createSupabaseServerClient();

    const modified_at = new Date().toISOString();
    const resultCategory = await supabase
      .from("product_category")
      .update({ ...data, modified_at })
      .eq("id", categoryId)
      .single();

    revalidatePath(DASHBOARD_PATH_CATEGORIES);
    return JSON.stringify(resultCategory);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategoryById(categoryId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultCategory = await supabase
      .from("product_category")
      .delete()
      .eq("id", categoryId);

    revalidatePath(DASHBOARD_PATH_CATEGORIES);
    return JSON.stringify(resultCategory);
  } catch (error) {
    console.log(error);
  }
}
