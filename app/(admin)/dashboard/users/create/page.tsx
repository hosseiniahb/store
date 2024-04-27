"use client";

import { UserForm } from "@/components/admin/dashboard/users/UserForm";
import { toast } from "@/components/ui/use-toast";
import { createNewUser } from "@/lib/actions/admin/users.actions";
import { UserFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();

  const handleCreateNewUser = async (userData: UserFormSchemaType) => {
    try {
      const result = await createNewUser(userData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to create new user.",
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
          title: "Successfully to create new user ",
        });
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserForm type="Create" handleUserForm={handleCreateNewUser} />
    </div>
  );
}
