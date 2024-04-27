"use client";

import { toast } from "@/components/ui/use-toast";
import { ProductFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/admin/dashboard/products/ProductForm";
import { editProductById } from "@/lib/actions/admin/products.actions";

export default function EditProduct({
  productId,
  data,
}: {
  productId: string;
  data: ProductFormSchemaType;
}) {
  const router = useRouter();

  const handleEditProduct = async (productData: ProductFormSchemaType) => {
    try {
      const result = await editProductById(productId, productData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to Edit product.",
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
          title: "Successfully to Edit product ",
        });
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductForm
        type="Edit"
        productData={data}
        handleProductForm={handleEditProduct}
      />
    </div>
  );
}
