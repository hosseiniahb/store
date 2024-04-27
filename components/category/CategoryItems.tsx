"use client";

import { getAllCategories } from "@/lib/actions/admin/categories.actions";
import CategoryItem from "@/components/category/CategoryItem";
import { I_Category } from "@/lib/types";
import { SquareStack } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryItemsSkeleton } from "@/components/Skeleton";

export default function CategoryItems() {
  const [categoriesData, setCategoriesData] = useState<Array<I_Category>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategoriesData = async () => {
      const response = await getAllCategories();
      const { data, error } = JSON.parse(response!);

      if (error) {
        setIsLoading(false);
        console.log(error);
        return;
      }
      setIsLoading(false);
      setCategoriesData(data);
    };
    getCategoriesData();
  }, []);

  return (
    <section className="w-full min-h-80 flex flex-col items-center justify-start gap-5">
      {/* <h3 className="text-3xl font-semibold text-slate-700 flex items-center gap-2">
        <SquareStack className="text-primary" />
        Categories
      </h3> */}
      <div className="w-full flex flex-wrap items-start justify-center gap-3">
        {isLoading ? (
          <CategoryItemsSkeleton />
        ) : categoriesData.length ? (
          categoriesData.map((category: I_Category) => (
            <CategoryItem key={category.id} name={category.name!} />
          ))
        ) : (
          <p className="mx-auto font-semibold my-8 md:my-0">
            Unfortunately, no categories were found.
          </p>
        )}
      </div>
    </section>
  );
}
