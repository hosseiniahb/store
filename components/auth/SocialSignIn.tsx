"use client";

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialSignIn() {
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-start justify-center gap-3">
      {/* Github */}
      <form onSubmit={loginWithGithub} className="w-full">
        <Button
          variant="outline"
          size="lg"
          className="w-full flex items-center justify-center gap-2 "
        >
          <FaGithub size={25} />
          Sign In with Github
        </Button>
      </form>
      {/* Google */}
      <form className="w-full">
        <Button
          variant="outline"
          size="lg"
          className="w-full flex items-center justify-center gap-2 "
        >
          <FcGoogle size={25} />
          Sign In with Google
        </Button>
      </form>
    </div>
  );
}
