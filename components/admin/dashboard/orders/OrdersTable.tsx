import { DataTable } from "@/components/ui/DataTable";
import { ColumnOrderTable } from "@/components/DataTableColumns";
import { toast } from "@/components/ui/use-toast";
import { getAllOrders } from "@/lib/actions/admin/orders.actions";

export default async function OrdersTable() {
  try {
    const result = await getAllOrders();
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

    return <DataTable columns={ColumnOrderTable} data={data} />;
  } catch (error) {
    console.log(error);
  }
}
