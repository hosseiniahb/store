"use client";

import { ListRestart } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleResetFilters = () => {
    if (searchParams.size) {
      router.push("/search");
    }
  };

  return (
    <Button
      onClick={handleResetFilters}
      disabled={!searchParams.size}
      type="button"
      size="icon"
      variant="secondary"
    >
      <ListRestart size={19} />
    </Button>
  );
}
