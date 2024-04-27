"use server";

import { UserInfoFormSchemaType } from "@/lib/schema";
import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const PROFILE_SETTING_PATH = "/profile/setting";

export async function getInformationUser() {
  try {
    const supabase = await createSupabaseServerClient();

    const user = await supabase.auth.getUser();

    if (user.error) {
      return JSON.stringify(user);
    }

    const userId = user.data.user.id;

    const getUser = await supabase
      .from("users")
      .select("email,user_name,avatar_url, phone")
      .match({ id: userId })
      .single();

    return JSON.stringify(getUser);
  } catch (error) {
    console.log(error);
  }
}

export async function editUserInformation(userData: UserInfoFormSchemaType) {
  try {
    const { email, user_name, avatar_url, phone } = userData;

    const supabase = await createSupabaseServerClient();

    const user = await supabase.auth.getUser();

    if (user.error) {
      return JSON.stringify(user);
    }

    const userId = user.data.user.id;

    const modified_at = new Date().toISOString();
    if (email !== user.data.user.email) {
      const editInfoUser = await supabase
        .from("users")
        .update({
          avatar_url,
          email,
          phone,
          user_name,
          modified_at,
        })
        .match({ id: userId })
        .single();

      if (editInfoUser.error) {
        return JSON.stringify(editInfoUser);
      }

      const result = await supabase.auth.updateUser({
        email,
      });
      console.log(result);
    }

    const editInfoUser = await supabase
      .from("users")
      .update({
        avatar_url,
        email,
        phone,
        user_name,
        modified_at,
      })
      .match({ id: userId })
      .single();

    revalidatePath(PROFILE_SETTING_PATH);
    return JSON.stringify(editInfoUser);
  } catch (error) {
    console.log(error);
  }
}
