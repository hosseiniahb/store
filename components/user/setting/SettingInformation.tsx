import { toast } from "@/components/ui/use-toast";
import { getInformationUser } from "@/lib/actions/user/users.actions";
import EditUserInformation from "./EditUserInformation";

export default async function SettingInformation() {
  try {
    const result = await getInformationUser();
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

    return <EditUserInformation data={data} />;
  } catch (error) {
    console.log(error);
  }
}
