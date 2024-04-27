import { ColumnProductTable } from "@/components/DataTableColumns";
import { DataTable } from "@/components/ui/DataTable";
import { toast } from "@/components/ui/use-toast";
import { getAllProducts } from "@/lib/actions/admin/products.actions";

export default async function ProductTable() {
  try {
    const result = await getAllProducts();
    const { data, error } = JSON.parse(result!);

    if (error) {
      toast({
        title: "Fail to get products.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error.message)}</code>
          </pre>
        ),
      });
      return <h1>Unfortunately, no data was found.</h1>;
    }

    return <DataTable columns={ColumnProductTable} data={data} />;
  } catch (error) {
    console.log(error);
  }
}
