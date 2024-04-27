"use client";

import { useUser } from "@/lib/store/user.store";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";

export default function SessionProvider() {
  const { setUser } = useUser();

  const supabase = createBrowserClient<Database["public"]["Tables"]["users"]>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    const { data: userInfo } = await supabase
      .from("users")
      .select("*")
      .match({
        id: data.session?.user.id,
      })
      .single();

    setUser(userInfo);
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return <></>;
}
