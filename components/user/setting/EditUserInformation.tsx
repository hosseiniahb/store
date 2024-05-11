"use client";

import { UserInfoFormSchemaType } from "@/lib/schema";
import { UserInfoForm } from "./UserInfoForm";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { editUserInformation } from "@/lib/actions/user/users.actions";
import { useUser } from "@/lib/store/user.store";

export default function EditUserInfoForm({
  data,
}: {
  data: UserInfoFormSchemaType;
}) {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleEditUser = async (userData: UserInfoFormSchemaType) => {
    try {
      const result = await editUserInformation(userData);
      const { error } = JSON.parse(result!);
      if (error) {
        toast({
          title: "Fail to Edit Information.",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(error.message)}
              </code>
            </pre>
          ),
        });
      } else {
        const { email, user_name, avatar_url, phone } = userData;
        toast({
          title: "Successfully to Edit Information ",
        });
        setUser({
          ...user!,
          email,
          avatar_url,
          user_name,
          phone: phone || null,
        });
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <UserInfoForm userData={data} handleUserForm={handleEditUser} />;
}
