"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebarLinks } from "@/lib/constants";
import { Store } from "lucide-react";
import { cn } from "@/lib/utils";
import Brand from "@/components/layout/Brand";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div
      className="w-48 h-full shadow-md fixed top-0 left-0 hidden md:flex flex-col items-center justify-between py-2 
    bg-slate-50 dark:bg-slate-900"
    >
      <div className="w-full flex flex-col items-center justify-start space-y-8">
        <div className="flex items-start justify-center border-b-2 py-5">
          <Brand
            label="Store"
            href="/"
            Icon={Store}
            IconStyles="text-primary"
            containerStyles="flex items-center gap-3 text-slate-700 dark:text-slate-300"
          />
        </div>
        <ul className="space-y-7">
          {DashboardSidebarLinks.map((link) => {
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
    </div>
  );
}
