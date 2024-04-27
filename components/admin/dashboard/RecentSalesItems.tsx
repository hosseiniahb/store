"use client";

import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

type RecentSalesItem = {
  image_url: string;
  user_name: string;
  email: string;
};

type RecentSalesItemsProps = Array<RecentSalesItem>;

export default function RecentSalesItems({ data }: RecentSalesItemsProps) {
  return (
    <Card className="col-span-1 xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Suspense fallback={<Loading />}>
          {data.length &&
            data?.map((card: RecentSalesItem, index: number) => (
              <div className="flex items-center gap-4" key={index}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={card.image_url} alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {card.user_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.email}</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
            ))}
        </Suspense>
      </CardContent>
    </Card>
  );
}
