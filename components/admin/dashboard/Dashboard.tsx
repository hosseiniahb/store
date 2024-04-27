// import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

// import CardDataDashboard from "./CardDataDashboard";
import RecentSales from "./RecentSales";
import RecentTransactionsDashboard from "./RecentTransactionsDashboard";

export function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* <CardDataDashboard
          name="Total Revenue"
          stat="45,231.89"
          change="20.1"
          changeType="positive"
          Icon={DollarSign}
        />
        <CardDataDashboard
          name="Sales"
          stat="12,234"
          change="19"
          changeType="positive"
          Icon={CreditCard}
        />
        <CardDataDashboard
          name="Active Now"
          stat="573"
          change="201"
          changeType="positive"
          Icon={Activity}
        /> */}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-5">
        <RecentTransactionsDashboard />
        <RecentSales />
      </div>
    </main>
  );
}
