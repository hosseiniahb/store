"use client";

import { ProductForm } from "@/components/admin/dashboard/products/ProductForm";
import { toast } from "@/components/ui/use-toast";
import { createNewProduct } from "@/lib/actions/admin/products.actions";
import { ProductFormSchemaType } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const handleCreateNewProduct = async (productData: ProductFormSchemaType) => {
    try {
      const result = await createNewProduct(productData);
      const { error } = JSON.parse(result!);

      if (error) {
        toast({
          title: "Fail to create new product.",
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
          title: "Successfully to create new product ",
        });
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductForm type="Create" handleProductForm={handleCreateNewProduct} />
    </div>
  );
}
