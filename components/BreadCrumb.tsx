"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadCrumb() {
  const pathname = usePathname();

  const breadCrumb = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumb.length &&
          breadCrumb.map((link, index) => {
            let href = `/${breadCrumb.slice(0, index + 1).join("/")}`;
            return (
              <Fragment key={index}>
                {index === breadCrumb.length - 1 ? (
                  <BreadcrumbPage className="capitalize">{link}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <Link href={href} className="capitalize font-semibold">
                        {link}
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
