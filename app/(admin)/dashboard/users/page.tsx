import UsersTable from "@/components/admin/dashboard/users/UsersTable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function UserManagementPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-500">
          User Management
        </h1>
        <Link href="/dashboard/users/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="w-full my-6">
        <Suspense fallback={<Loading />}>
          <UsersTable />
        </Suspense>
      </div>
    </div>
  );
}
