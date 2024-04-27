import Banner from "@/components/Banner";
import CategoryItems from "@/components/category/CategoryItems";
import Hero from "@/components/layout/Hero";

export default async function Home() {
  return (
    <div className="w-full h-auto">
      <Hero />
      <CategoryItems />
      <section className="w-full flex items-start justify-center gap-5 flex-wrap">
        <Banner
          bgColor="bg-yellow-300"
          title="The best cosmetics"
          textColor="text-black dark:text-slate-600"
          imageUrl="/images/products/airpods.jpg"
        />
      </section>
    </div>
  );
}
