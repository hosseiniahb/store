import EditProduct from "@/components/admin/dashboard/products/EditProduct";
import { getProductById } from "@/lib/actions/admin/products.actions";

export default async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const result = await getProductById(productId);

  const { data } = JSON.parse(result!);

  return (
    <div>
      <EditProduct data={data} productId={productId} />
    </div>
  );
}
