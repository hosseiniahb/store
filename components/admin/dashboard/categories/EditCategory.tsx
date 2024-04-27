"use client";

import { toast } from "@/components/ui/use-toast";
import { CategoryFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";

import { editCategoryById } from "@/lib/actions/admin/categories.actions";
import { CategoryForm } from "./CategoryForm";

export default function EditCategory({
  categoryId,
  data,
}: {
  categoryId: string;
  data: CategoryFormSchemaType;
}) {
  const router = useRouter();

  const handleEditCategory = async (categoryData: CategoryFormSchemaType) => {
    try {
      const result = await editCategoryById(categoryId, categoryData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to Edit category.",
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
          title: "Successfully to Edit category ",
        });
        router.push("/dashboard/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CategoryForm
        type="Edit"
        categoryData={data}
        handleCategoryForm={handleEditCategory}
      />
    </div>
  );
}
