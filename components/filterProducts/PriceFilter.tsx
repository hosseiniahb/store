"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { DollarSign } from "lucide-react";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceMin, setPriceMin] = useState<number>(
    Number(searchParams.get("price_min")) || 0
  );
  const [priceMax, setPriceMax] = useState<number>(
    Number(searchParams.get("price_max")) || 0
  );

  const handleFilterPrice = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const priceMin = form.price_min.value as string;
    const priceMax = form.price_max.value as string;

    const query = new URLSearchParams(searchParams.toString());

    if (priceMin && priceMax) {
      query.set("price_min", priceMin);
      query.set("price_max", priceMax);
    } else {
      query.delete("price_min");
      query.delete("price_max");
    }

    router.push(createUrl("/search", query));
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price-filter" className="border-none">
          <AccordionTrigger className="text-sm">Price</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleFilterPrice} className="px-2 space-y-2">
              <p className="font-bold text-xs text-slate-700 dark:text-slate-400">
                From
              </p>
              <div className="w-full flex items-center gap-2">
                <Input
                  type="number"
                  name="price_min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="relative"
                />
                <DollarSign size={15} />
              </div>
              <p className="font-bold text-xs text-slate-700 dark:text-slate-400">
                To
              </p>
              <div className="w-full flex items-center gap-2">
                <Input
                  type="number"
                  name="price_max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="relative"
                />
                <DollarSign size={15} />
              </div>

              <Button size="sm" className="w-full">
                Apply
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
