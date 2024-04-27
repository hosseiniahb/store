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

export default function ConnectionTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterConnectionType = (selectValue: string) => {
    const value = selectValue;
    const query = new URLSearchParams(searchParams.toString());

    if (value) {
      query.set("ct", value);
    } else {
      query.delete("ct");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Select
        onValueChange={handleFilterConnectionType}
        value={searchParams.get("ct") || ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Connection Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="wireless">Wireless</SelectItem>
            <SelectItem value="Wired">Wired</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
