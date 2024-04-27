import DashboardSidebarMobile from "@/components/admin/dashboard/DashboardNavMobile";
import { DashboardSidebar } from "@/components/admin/dashboard/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="w-full h-16 md:min-h-screen md:w-52 md:h-full">
          <DashboardSidebar />
          <DashboardSidebarMobile />
        </div>
        <main className="w-full min-h-screen p-7 flex flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <BreadCrumb />
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
