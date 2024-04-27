"use client";

import { UserForm } from "@/components/admin/dashboard/users/UserForm";
import { toast } from "@/components/ui/use-toast";
import { editUserById } from "@/lib/actions/admin/users.actions";
import { UserFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function EditUser({
  userId,
  data,
}: {
  userId: string;
  data: UserFormSchemaType;
}) {
  const router = useRouter();

  const handleEditUser = async (userData: UserFormSchemaType) => {
    try {
      const result = await editUserById(userId, userData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to Edit user.",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(error.message)}
              </code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Successfully to Edit user ",
        });
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserForm type="Edit" userData={data} handleUserForm={handleEditUser} />
    </div>
  );
}
