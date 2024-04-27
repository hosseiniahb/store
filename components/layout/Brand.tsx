import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type BrandProps = {
  label: string;
  href?: string;
  Icon?: LucideIcon;
  IconStyles?: string;
  containerStyles?: string;
};

export default function Brand({
  label,
  href,
  Icon,
  IconStyles,
  containerStyles,
}: BrandProps) {
  return (
    <Link href={href ?? "/"}>
      <h1 className={cn(`font-bold text-2xl ${containerStyles}`)}>
        {Icon && (
          <span className={IconStyles}>
            <Icon />
          </span>
        )}
        {label}
      </h1>
    </Link>
  );
}
