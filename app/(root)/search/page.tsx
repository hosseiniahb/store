import Filters from "@/components/filterProducts/Filters";
import ProductItems from "@/components/product/ProductItems";

export default async function SearchPage() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-start gap-7 my-10">
      <div className="w-full h-20 md:w-[300px] md:h-screen border rounded-lg">
        <Filters />
      </div>
      <section className="w-full min-h-full flex flex-wrap gap-2">
        <ProductItems />
      </section>
    </div>
  );
}
