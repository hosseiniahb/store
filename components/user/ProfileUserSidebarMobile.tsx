"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProfileUserSidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/lib/store/user.store";

export default function ProfileUserSidebarMobile() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="w-full z-30 flex h-16 items-center justify-between md:hidden px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Avatar className="w-20 h-20 border mx-auto">
              <AvatarImage
                src={user?.avatar_url}
                className="object-cover object-center"
              />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
            <ul className="space-y-7">
              {ProfileUserSidebarLinks.map((link) => {
                const Icon = link.Icon;
                return (
                  <Link href={link.href} key={link.name}>
                    <li
                      className={cn(
                        `p-2 rounded-xl my-3 text-slate-500 transition-all duration-100 flex items-center gap-3 hover:bg-primary-foreground dark:hover:bg-slate-700`,
                        {
                          "text-primary hover:bg-accent":
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
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
