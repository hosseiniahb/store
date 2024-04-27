import { DataTable } from "@/components/ui/DataTable";
import { ColumnUserTable } from "@/components/DataTableColumns";
import { toast } from "@/components/ui/use-toast";
import { getAllUsers } from "@/lib/actions/admin/users.actions";

export default async function UsersTable() {
  try {
    const result = await getAllUsers();
    const { data, error } = JSON.parse(result!);

    if (error) {
      toast({
        title: "Fail to get users.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error.message)}</code>
          </pre>
        ),
      });
      return <h1>Unfortunately, no data was found.</h1>;
    }

    return <DataTable columns={ColumnUserTable} data={data} />;
  } catch (error) {
    console.log(error);
  }
}
