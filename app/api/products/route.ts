import { createSupabaseServerClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type QueryType = {
  brand?: string;
  type?: string;
  price_min?: string;
  price_max?: string;
  has_selling?: string;
  q?: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const selectQuery: Record<string, string> = {};

  searchParams.forEach((value: string, key: string) => {
    selectQuery[key] = value;
  });

  try {
    const {
      brand,
      has_selling,
      price_min,
      price_max,
      q: query,
      type,
    }: QueryType = selectQuery;

    const supabase = await createSupabaseServerClient();

    const requestQuery = supabase
      .from("products")
      .select("id, title, image_url, price, count");

    if (query) requestQuery.ilike("title", `%${query}%`);
    if (has_selling) requestQuery.gte("count", 1);
    if (price_min || price_max)
      requestQuery
        .gt("price", Number(price_min))
        .lte("price", Number(price_max));
    if (brand) requestQuery.textSearch("title", `${brand}`);
    if (type) requestQuery.textSearch("description", `${type}`);

    const { data, error } = await requestQuery;

    return NextResponse.json({ error, data });
  } catch (error) {
    return NextResponse.json({ error, data: [] });
  }
}
