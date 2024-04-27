import EditUser from "@/components/admin/dashboard/users/EditUser";
import { getUserById } from "@/lib/actions/admin/users.actions";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  const result = await getUserById(userId);
  const { data } = JSON.parse(result!);

  return (
    <div>
      <EditUser data={data} userId={userId} />
    </div>
  );
}
