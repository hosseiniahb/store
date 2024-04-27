import { DataTable } from "@/components/ui/DataTable";
import { ColumnOrderUserTable } from "@/components/DataTableColumns";
import { toast } from "@/components/ui/use-toast";
import { getOrdersUser } from "@/lib/actions/user/orders.actions";

export default async function OrdersUserTable() {
  try {
    const result = await getOrdersUser();
    const { data, error } = JSON.parse(result!);

    if (error) {
      toast({
        title: "Fail to get orders.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error.message)}</code>
          </pre>
        ),
      });
      return <h1>Unfortunately, no data was found.</h1>;
    }
    return <DataTable columns={ColumnOrderUserTable} data={data} />;
  } catch (error) {
    console.log(error);
  }
}
