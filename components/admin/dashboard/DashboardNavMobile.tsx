"use client";

import Brand from "@/components/layout/Brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebarMobile() {
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
            <Brand
              label="Store"
              href="/"
              Icon={Store}
              IconStyles="text-primary"
              containerStyles="flex items-center gap-3 text-slate-700 dark:text-slate-300"
            />
            <ul className="space-y-7">
              {DashboardSidebarLinks.map((link) => {
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
