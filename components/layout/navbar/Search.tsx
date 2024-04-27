"use client";

import { Input } from "@/components/ui/input";
import { createUrl } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;
    const query = new URLSearchParams(searchParams.toString());

    if (search.value) {
      query.set("q", search.value);
    } else {
      query.delete("q");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <form
      className="w-full relative flex items-center"
      onSubmit={searchHandler}
    >
      <Input
        type="text"
        defaultValue={searchParams.get("q") || ""}
        placeholder="Search for products..."
        name="search"
        className="outline-none transition-all pr-10"
        autoComplete="false"
      />
      <div className="absolute right-3 text-slate-700 dark:text-slate-500">
        <SearchIcon size={20} />
      </div>
    </form>
  );
}
