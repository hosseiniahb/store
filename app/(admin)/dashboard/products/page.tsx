import ProductTable from "@/components/admin/dashboard/products/ProductTable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductManagementPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-500">
          Product Management
        </h1>
        <Link href="/dashboard/products/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="w-full my-6">
        <Suspense fallback={<Loading />}>
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
}
