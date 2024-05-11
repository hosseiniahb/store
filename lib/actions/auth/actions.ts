"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { AuthFormSchema, AuthFormSchemaType } from "@/lib/schema";

export async function login(formData: AuthFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();

    const validation = AuthFormSchema.safeParse(formData);

    if (validation.success) {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        return JSON.stringify(error);
      }

      return JSON.stringify({ data: "OK" });
    } else {
      return JSON.stringify({ error: { message: validation.error.issues } });
    }
  } catch (error) {
    return JSON.stringify({ error: { message: error } });
  }
}

export async function signup(formData: AuthFormSchemaType) {
  try {
    const supabase = await createSupabaseServerClient();

    const validation = AuthFormSchema.safeParse(formData);

    if (validation.success) {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        return JSON.stringify(error);
      }

      return JSON.stringify({ data: "OK" });
    } else {
      return JSON.stringify({ error: { message: validation.error.issues } });
    }
  } catch (error) {
    return JSON.stringify({ error: { message: error } });
  }
}
