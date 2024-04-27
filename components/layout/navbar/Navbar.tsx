"use client";

import { MainNavLink } from "@/lib/constants";
import Link from "next/link";
import Brand from "@/components/layout/Brand";
import { Menu, Store } from "lucide-react";
import Search from "@/components/layout/navbar/Search";
import Cart from "@/components/cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ModeToggle";
import Auth from "@/components/auth/Auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Navbar for Desktop */}
      <nav className="hidden md:flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-10">
          <Brand
            label="Store"
            href="/"
            Icon={Store}
            IconStyles="text-primary"
            containerStyles="flex items-center gap-3 text-slate-700 dark:text-slate-300"
          />
          <div>
            <ul className="flex items-center gap-5">
              {MainNavLink.map(({ title, href }, index) => (
                <Link href={href} key={index}>
                  <li className="text-sm font-semibold text-slate-600 hover:bg-accent rounded-lg p-2 dark:text-slate-400">
                    {title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Search />
          </div>
          <Cart />
          <ModeToggle />
          <Auth />
        </div>
      </nav>

      {/* Navbar for mobile */}
      <nav className="w-full z-30 flex md:hidden h-16 items-center justify-between px-4">
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
              <Search />
              <ul className="space-y-7">
                {MainNavLink.map((link) => (
                  <Link href={link.href} key={link.title}>
                    <li
                      className={cn(
                        `p-2 rounded-xl my-3 text-slate-500 transition-all duration-100 flex items-center gap-3 hover:bg-primary-foreground dark:hover:bg-slate-700`,
                        {
                          "text-primary hover:bg-accent":
                            pathname === link.href,
                        }
                      )}
                    >
                      {link.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-5">
          <Cart />
          <ModeToggle />
          <Auth />
        </div>
      </nav>
    </>
  );
}
