"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export async function addToCart(productId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUser = await supabase.auth.getUser();

    if (resultUser.error) {
      return JSON.stringify(resultUser);
    }

    const { id: userId } = resultUser.data.user;

    if (userId && productId) {
      const findProduct = await supabase
        .from("products")
        .select("id, count , price")
        .match({ id: productId })
        .single();

      if (findProduct.error) {
        return JSON.stringify({
          error: { message: "No product found." },
        });
      }

      if (findProduct.data.count <= 0) {
        return JSON.stringify({
          error: { message: "Unfortunately, this product is out of stock." },
        });
      }

      const created_at = new Date().toISOString();
      const modified_at = new Date().toISOString();

      const existShoppingSession = await supabase
        .from("shopping_session")
        .select("id, user_id, total")
        .match({ user_id: userId })
        .single();

      // if shopping session is exist by product id
      if (existShoppingSession.data) {
        const existProductInCart = await supabase
          .from("cart_item")
          .select("product_id, quantity")
          .match({
            product_id: findProduct.data.id,
          })
          .single();

        if (existProductInCart.data) {
          const updateQuantityProductInCart = await supabase
            .from("cart_item")
            .update({
              quantity: existProductInCart.data.quantity + 1,
              modified_at,
            })
            .match({
              product_id: existProductInCart.data.product_id,
              session_id: existShoppingSession.data.id,
            })
            .select("quantity")
            .single();

          if (updateQuantityProductInCart.error) {
            return JSON.stringify(updateQuantityProductInCart);
          }

          const total = existShoppingSession.data.total;
          const updateTotalShoppingSession = await supabase
            .from("shopping_session")
            .update({
              total: total + findProduct.data.price,
              modified_at,
            })
            .match({
              id: existShoppingSession.data.id,
              user_id: existShoppingSession.data.user_id,
            });

          return JSON.stringify(updateTotalShoppingSession);
        }

        const newProductInCartItem = await supabase
          .from("cart_item")
          .insert({
            quantity: 1,
            product_id: findProduct.data.id,
            session_id: existShoppingSession.data.id,
            modified_at,
            created_at,
          })
          .select("session_id, quantity")
          .single();

        if (newProductInCartItem.error) {
          return JSON.stringify(newProductInCartItem);
        }

        const getShoppingSession = await supabase
          .from("shopping_session")
          .select("total")
          .match({ user_id: userId })
          .single();

        if (getShoppingSession.error) {
          return JSON.stringify(getShoppingSession);
        }

        const updateTotalShoppingSession = await supabase
          .from("shopping_session")
          .update({
            total:
              findProduct.data.price * newProductInCartItem.data.quantity +
              getShoppingSession.data?.total,
          })
          .match({
            id: newProductInCartItem.data.session_id,
          });

        return JSON.stringify(updateTotalShoppingSession);
      }

      // if shopping session is not exist, create new shopping session and cart item
      const newShoppingSession = await supabase
        .from("shopping_session")
        .insert({
          user_id: userId,
          total: 0,
          modified_at,
          created_at,
        })
        .select("id, user_id")
        .single();

      if (newShoppingSession.error) {
        return JSON.stringify(newShoppingSession);
      }

      const createCartItem = await supabase
        .from("cart_item")
        .insert({
          session_id: newShoppingSession.data.id,
          product_id: findProduct.data.id,
          quantity: 1,
          modified_at,
          created_at,
        })
        .select("quantity")
        .single();

      if (createCartItem.error) {
        return JSON.stringify(createCartItem);
      }

      const updateTotalShoppingSession = await supabase
        .from("shopping_session")
        .update({
          total: findProduct.data.price * createCartItem.data.quantity,
        })
        .match({
          id: newShoppingSession.data.id,
          user_id: newShoppingSession.data.user_id,
        });

      return JSON.stringify(updateTotalShoppingSession);
    }
    return JSON.stringify({ error: "You must log in." });
  } catch (error) {
    console.log(error);
  }
}

export async function removeToCart(productId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUser = await supabase.auth.getUser();

    if (resultUser.error) {
      return JSON.stringify(resultUser);
    }

    const { id: userId } = resultUser.data.user;

    if (userId && productId) {
      const findProduct = await supabase
        .from("products")
        .select("id, price")
        .match({ id: productId })
        .single();

      if (findProduct.error) {
        return JSON.stringify(findProduct);
      }

      const getShoppingSession = await supabase
        .from("shopping_session")
        .select("id, total")
        .match({ user_id: userId })
        .single();

      if (getShoppingSession.error) {
        return JSON.stringify(getShoppingSession);
      }

      const getCartItem = await supabase
        .from("cart_item")
        .select("id, quantity")
        .match({
          session_id: getShoppingSession.data.id,
          product_id: findProduct.data.id,
        })
        .single();

      if (getCartItem.error) {
        return JSON.stringify(getCartItem);
      }

      const { total } = getShoppingSession.data;
      const { quantity } = getCartItem.data;

      if (quantity === 1) {
        const deleteCartItem = await supabase
          .from("cart_item")
          .delete()
          .match({ id: getCartItem.data.id, product_id: findProduct.data.id });

        console.log(deleteCartItem);

        // if (deleteCartItem.error) {
        return JSON.stringify(deleteCartItem);
        // }

        // const updateTotalShoppingSession = await supabase
        //   .from("shopping_session")
        //   .update({ total: total - findProduct.data.price })
        //   .match({ user_id: userId });

        // return JSON.stringify(updateTotalShoppingSession);
      }

      const decreaseQuantity = await supabase
        .from("cart_item")
        .update({ quantity: quantity - 1 })
        .match({ product_id: findProduct.data.id });

      if (decreaseQuantity.error) {
        return JSON.stringify(decreaseQuantity);
      }

      const updateTotalShoppingSession = await supabase
        .from("shopping_session")
        .update({ total: total - findProduct.data.price })
        .match({ user_id: userId });

      return JSON.stringify(updateTotalShoppingSession);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductInCart(productId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUser = await supabase.auth.getUser();

    if (resultUser.error) {
      return JSON.stringify(resultUser);
    }

    const { id: userId } = resultUser.data.user;

    if (userId && productId) {
      const findProduct = await supabase
        .from("products")
        .select("id, price")
        .match({ id: productId })
        .single();

      if (findProduct.error) {
        return JSON.stringify(findProduct);
      }

      const getShoppingSession = await supabase
        .from("shopping_session")
        .select("id, total")
        .match({ user_id: userId })
        .single();

      if (getShoppingSession.error) {
        return JSON.stringify(getShoppingSession);
      }

      const getCartItem = await supabase
        .from("cart_item")
        .select("id, quantity")
        .match({
          session_id: getShoppingSession.data.id,
          product_id: findProduct.data.id,
        })
        .single();

      if (getCartItem.error) {
        return JSON.stringify(getCartItem);
      }

      const { total } = getShoppingSession.data;
      const { quantity } = getCartItem.data;

      const deleteCartItem = await supabase
        .from("cart_item")
        .delete()
        .match({ id: getCartItem.data.id });

      if (deleteCartItem.error) {
        return JSON.stringify(deleteProductInCart);
      }

      const updatedTotalShoppingSession = await supabase
        .from("shopping_session")
        .update({ total: total - quantity * findProduct.data.price })
        .match({ id: getShoppingSession.data.id, user_id: userId });

      return JSON.stringify(updatedTotalShoppingSession);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getQuantityCartItems() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUser = await supabase.auth.getUser();

    if (resultUser.error) {
      return JSON.stringify(resultUser);
    }

    const { id: userId } = resultUser.data.user;

    if (userId) {
      const findShoppingSessionUser = await supabase
        .from("shopping_session")
        .select("id")
        .match({ user_id: userId })
        .single();

      if (findShoppingSessionUser.error) {
        return JSON.stringify(findShoppingSessionUser);
      }

      const { data } = await supabase
        .from("cart_item")
        .select("quantity")
        .match({ session_id: findShoppingSessionUser.data.id });

      return JSON.stringify(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCartItem() {
  try {
    const supabase = await createSupabaseServerClient();

    const resultUser = await supabase.auth.getUser();

    if (resultUser.error) {
      return JSON.stringify(resultUser);
    }

    const { id: userId } = resultUser.data.user;

    if (userId) {
      const getShoppingSession = await supabase
        .from("shopping_session")
        .select("id")
        .match({ user_id: userId })
        .single();

      if (getShoppingSession.error) {
        return JSON.stringify(getShoppingSession);
      }

      const getCartItems = await supabase
        .from("cart_item")
        .select("quantity, products(id, title, price, image_url)")
        .match({ session_id: getShoppingSession.data.id })
        .order("created_at", { ascending: false });

      return JSON.stringify(getCartItems);
    }
  } catch (error) {
    console.log(error);
  }
}
