import CategoriesTable from "@/components/admin/dashboard/categories/CategoriesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoriesManagementPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-500">
          Category Management
        </h1>
        <Link href="/dashboard/categories/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="w-full my-6">
        <CategoriesTable />
      </div>
    </div>
  );
}
