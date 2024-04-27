import { getDashboardRecentSales } from "@/lib/actions/admin/dashboard.actions";
import RecentSalesItems from "@/components/admin/dashboard/RecentSalesItems";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default async function RecentSales() {
  const result = await getDashboardRecentSales();
  const { data, error } = JSON.parse(result!);

  if (error) {
    return <p>recent Sales not found</p>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <RecentSalesItems data={data} />
    </Suspense>
  );
}
