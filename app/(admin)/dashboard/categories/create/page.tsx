"use client";
import { CategoryForm } from "@/components/admin/dashboard/categories/CategoryForm";
import { toast } from "@/components/ui/use-toast";
import { createNewCategory } from "@/lib/actions/admin/categories.actions";
import { CategoryFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {
  const router = useRouter();

  const handleCreateNewCategory = async (
    categoryData: CategoryFormSchemaType
  ) => {
    try {
      const result = await createNewCategory(categoryData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to create new category.",
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
          title: "Successfully to create new category ",
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
        type="Create"
        handleCategoryForm={handleCreateNewCategory}
      />
    </div>
  );
}
