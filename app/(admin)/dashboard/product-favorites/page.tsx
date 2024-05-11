import ProductFavoritesList from "@/components/user/product-favorites/ProductFavoritesList";

export default function ProductFavorites() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-500">
          Product Favorites
        </h1>
      </div>
      <ProductFavoritesList />
    </div>
  );
}
