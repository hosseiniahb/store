import Brand from "@/components/layout/Brand";
import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full p-8 bg-primary-foreground">
      <Brand
        label="Store"
        href="/"
        Icon={Store}
        IconStyles="text-primary"
        containerStyles="flex items-center gap-3 text-slate-700 dark:text-slate-300"
      />
    </footer>
  );
}
