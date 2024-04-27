import EditCategory from "@/components/admin/dashboard/categories/EditCategory";
import { getCategoryById } from "@/lib/actions/admin/categories.actions";

export default async function EditCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const result = await getCategoryById(categoryId);

  const { data } = JSON.parse(result!);

  return (
    <div>
      <EditCategory data={data} categoryId={categoryId} />
    </div>
  );
}
