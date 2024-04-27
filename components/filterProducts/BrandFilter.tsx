"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function BrandFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterBrand = (selectValue: string) => {
    const value = selectValue;
    const query = new URLSearchParams(searchParams.toString());

    if (value) {
      query.set("brand", value);
    } else {
      query.delete("brand");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Select
        onValueChange={handleFilterBrand}
        value={searchParams.get("brand") || ""}
      >
        <SelectTrigger className="w-full p-0 border-none">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="philips">Philips</SelectItem>
            <SelectItem value="razer">Razer</SelectItem>
            <SelectItem value="sony">Sony</SelectItem>
            <SelectItem value="rode">Rode</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
