import ProductItemDetails from "@/components/product/ProductItemDetails";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <>
      <ProductItemDetails productId={params.productId} />
      <RelatedProducts productId={params.productId} />
    </>
  );
}
