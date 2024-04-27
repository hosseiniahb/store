"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/lib/store/user.store";
import { RxDashboard } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Profile() {
  const { user, setUser } = useUser();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const is_admin = user?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.avatar_url}
            alt={user?.user_name}
            className="object-cover rounded-full"
          />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 py-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <p className="px-2 text-sm text-slate-500">{user?.email}</p>
        <DropdownMenuSeparator />
        {is_admin ? (
          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full flex items-center py-2">
              <RxDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/profile" className="w-full flex items-center py-2">
              <RxDashboard className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="text-red-500 font-semibold"
          onClick={handleLogout}
        >
          <Button size="sm" variant="ghost" className="p-0 w-full text-red-500">
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
