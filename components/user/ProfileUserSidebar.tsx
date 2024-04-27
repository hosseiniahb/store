"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProfileUserSidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/store/user.store";
import { Button } from "../ui/button";
import { createBrowserClient } from "@supabase/ssr";
import { LogOut } from "lucide-react";

export function ProfileUserSidebar() {
  const { user, setUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <div
      className="w-52 h-full shadow-md fixed top-0 left-0 hidden md:flex flex-col items-center justify-between py-8
    bg-slate-50 dark:bg-slate-900"
    >
      <div className="w-full flex flex-col items-center justify-start">
        <div className="flex items-start justify-center">
          <Avatar className="w-20 h-20 border">
            <AvatarImage
              src={user?.avatar_url}
              className="object-cover object-center"
            />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </div>
        <ul className="space-y-7 mt-7">
          {ProfileUserSidebarLinks.map((link) => {
            const Icon = link.Icon;
            return (
              <Link href={link.href} key={link.name}>
                <li
                  className={cn(
                    `p-2 rounded-xl my-3 text-slate-500 transition-all duration-100 flex items-center gap-3 hover:bg-primary-foreground dark:hover:bg-slate-700`,
                    {
                      "bg-primary text-slate-200 hover:bg-primary":
                        pathname === link.href,
                    }
                  )}
                >
                  <span>
                    <Icon />
                  </span>
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={handleLogout}
        size="sm"
        variant="ghost"
        className="text-red-500 flex items-center gap-3"
      >
        <LogOut />
        Log out
      </Button>
    </div>
  );
}
