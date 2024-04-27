import { DataTable } from "@/components/ui/DataTable";
import { ColumnCategoryTable } from "@/components/DataTableColumns";
import { toast } from "@/components/ui/use-toast";
import { getAllCategories } from "@/lib/actions/admin/categories.actions";

export default async function CategoriesTable() {
  try {
    const result = await getAllCategories();
    const { data, error } = JSON.parse(result!);

    if (error) {
      toast({
        title: "Fail to get categories.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error.message)}</code>
          </pre>
        ),
      });
      return <h1>Unfortunately, no data was found.</h1>;
    }

    return <DataTable columns={ColumnCategoryTable} data={data} />;
  } catch (error) {
    console.log(error);
  }
}
