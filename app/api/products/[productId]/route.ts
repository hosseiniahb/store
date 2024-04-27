import { createSupabaseServerClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId.trim();

  if (productId) {
    try {
      const supabase = await createSupabaseServerClient();
      const existProduct = await supabase
        .from("products")
        .select("id, title, description, price,image_url, count, category_id")
        .match({ id: productId })
        .single();

      if (existProduct.error) {
        return NextResponse.json(existProduct);
      }
      return NextResponse.json(existProduct);
    } catch (error) {
      return NextResponse.json({ error, data: [] });
    }
  }

  return NextResponse.json({ error: "product id is not exist.", data: {} });
}
