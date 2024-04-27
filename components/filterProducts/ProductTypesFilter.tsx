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

export default function ProductTypesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterType = (selectValue: string) => {
    const value = selectValue;
    const query = new URLSearchParams(searchParams.toString());

    if (value) {
      query.set("type", value);
    } else {
      query.delete("type");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Select
        onValueChange={handleFilterType}
        value={searchParams.get("type") || ""}
      >
        <SelectTrigger className="w-full p-0 border-none">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="earphone">Earphone</SelectItem>
            <SelectItem value="over-ear">Over Ear</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
