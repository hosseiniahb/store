"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { UserFormSchemaType } from "@/lib/schema";
import { revalidatePath } from "next/cache";

const DASHBOARD_PATH_USERS = "/dashboard/users";

export async function getAllUsers() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("users")
      .select(`id, email, user_name, role, phone, created_at, modified_at`)
      .order("created_at", { ascending: false });

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("users")
      .select("role, email, user_name, phone")
      .eq("id", userId)
      .single();

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function createNewUser(data: UserFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();
    const created_at = new Date().toISOString();
    const modified_at = new Date().toISOString();
    const result = await supabase
      .from("users")
      .insert({ ...data, created_at, modified_at });

    revalidatePath(DASHBOARD_PATH_USERS);
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserById(userId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("users").delete().eq("id", userId);

    revalidatePath(DASHBOARD_PATH_USERS);
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}

export async function editUserById(userId: string, data: UserFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();
    const modified_at = new Date().toISOString();
    const result = await supabase
      .from("users")
      .update({ ...data, modified_at })
      .eq("id", userId);

    revalidatePath(DASHBOARD_PATH_USERS);
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
}
