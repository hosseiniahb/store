import BreadCrumb from "@/components/BreadCrumb";
import { ModeToggle } from "@/components/ModeToggle";
import { ProfileUserSidebar } from "@/components/user/ProfileUserSidebar";
import ProfileUserSidebarMobile from "@/components/user/ProfileUserSidebarMobile";
import { ReactNode } from "react";

export default function ProfileUserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex justify-between">
      <div className="w-2/12">
        <ProfileUserSidebar />
        <ProfileUserSidebarMobile />
      </div>
      <div className="w-full md:w-10/12 flex flex-col gap-5">
        <div className="w-full flex items-center justify-between py-3 px-4">
          <BreadCrumb />
          <ModeToggle />
        </div>
        <div className="w-full px-10">{children}</div>
      </div>
    </div>
  );
}
