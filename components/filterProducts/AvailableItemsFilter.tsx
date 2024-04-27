"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function AvailableItemsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterAvailableItems = (activeSwitch: boolean) => {
    const value = activeSwitch;
    const query = new URLSearchParams(searchParams.toString());
    if (value) {
      query.set("has_selling", "1");
    } else {
      query.delete("has_selling");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <div className="w-full flex items-center gap-2 mt-3">
      <Label htmlFor="available-items-only">Available</Label>
      <Switch
        id="available-items-only"
        checked={searchParams.has("has_selling")}
        onCheckedChange={handleFilterAvailableItems}
      />
    </div>
  );
}
