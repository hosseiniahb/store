"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export async function getProductByCategoryName(categoryName?: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultProductByCategory = await supabase
      .from("products")
      .select("id, title, image_url, price, count, product_category(name)");

    return JSON.stringify(resultProductByCategory);
  } catch (error) {
    console.log(error);
  }
}

export async function addToFavoriteProduct(productId: string) {
  const product_id = productId.trim();
  if (product_id) {
    try {
      const supabase = await createSupabaseServerClient();

      const getUser = await supabase.auth.getUser();

      if (getUser.error) {
        return JSON.stringify(getUser);
      }

      const getFavoriteList = await supabase
        .from("users")
        .select("favorite_list")
        .match({ id: getUser.data.user.id })
        .single();

      if (getFavoriteList.error) {
        return JSON.stringify(getFavoriteList);
      }
      const { favorite_list } = getFavoriteList.data;

      // if favorite_list and product in favorite list is exist, remove product from favorite list
      if (favorite_list?.length && favorite_list.includes(product_id)) {
        const filterFavoriteList = getFavoriteList.data.favorite_list?.filter(
          (product) => product !== product_id
        );

        const removeToFavoriteProduct = await supabase
          .from("users")
          .update({ favorite_list: filterFavoriteList })
          .match({ id: getUser.data.user.id });

        if (removeToFavoriteProduct.error) {
          return JSON.stringify({ data: null });
        }

        return JSON.stringify({ data: "REMOVE" });
      }

      // if favorite_list is exist, push new product in list

      let favoriteProductList: string[] = [];

      if (getFavoriteList.data.favorite_list) {
        favoriteProductList = [
          ...getFavoriteList.data.favorite_list,
          product_id,
        ];
      } else {
        favoriteProductList.push(product_id);
      }

      const updateFavoriteProduct = await supabase
        .from("users")
        .update({ favorite_list: favoriteProductList })
        .match({ id: getUser.data.user.id });

      if (updateFavoriteProduct.error) {
        return JSON.stringify({ data: null });
      }

      return JSON.stringify({ data: "CREATE" });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function checkIsFavoriteProduct(productId: string) {
  const product_id = productId.trim();
  if (product_id) {
    try {
      const supabase = await createSupabaseServerClient();

      const getUser = await supabase.auth.getUser();

      if (getUser.error) {
        return JSON.stringify(getUser);
      }
      const getFavoriteList = await supabase
        .from("users")
        .select("favorite_list")
        .match({ id: getUser.data.user.id })
        .single();

      return JSON.stringify(getFavoriteList);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getUserFavoriteProduct() {
  try {
    const supabase = await createSupabaseServerClient();

    const getUser = await supabase.auth.getUser();

    if (getUser.error) {
      return JSON.stringify(getUser);
    }
    const getFavoriteList = await supabase
      .from("users")
      .select("favorite_list")
      .match({ id: getUser.data.user.id })
      .single();

    if (getFavoriteList.error) {
      return JSON.stringify(getFavoriteList);
    }

    const { favorite_list } = getFavoriteList.data;

    if (favorite_list?.length) {
      const findProductByFavorite = await supabase
        .from("products")
        .select("id, title, image_url, price, count")
        .in("id", favorite_list);

      return JSON.stringify(findProductByFavorite);
    }

    return JSON.stringify(getFavoriteList);
  } catch (error) {
    console.log(error);
  }
}
