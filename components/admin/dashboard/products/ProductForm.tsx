"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormSchema, ProductFormSchemaType } from "@/lib/schema";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import CategoryDropdown from "../categories/CategoryDropdown";

type ProductFormProps = {
  type: "Edit" | "Create";
  productData?: ProductFormSchemaType;
  handleProductForm: (data: ProductFormSchemaType) => void;
};

export function ProductForm({
  type,
  productData,
  handleProductForm,
}: ProductFormProps) {
  const [file, setFile] = useState<File[]>([]);
  const [progressUploadImage, setProgressUploadImage] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: productData?.title || "",
      description: productData?.description || "",
      price: productData?.price || 0,
      image_url: productData?.image_url || "",
      count: productData?.count || 0,
      category_id: productData?.category_id || "",
    },
  });

  async function onSubmit(values: ProductFormSchemaType) {
    try {
      if (type === "Create") {
        let uploadedImageUrl = values.image_url;
        if (file.length > 0) {
          const res = await edgestore.publicFiles.upload({
            file: file[0],
            onProgressChange(progress) {
              setProgressUploadImage(progress);
            },
          });

          uploadedImageUrl = res.url;
        }
        handleProductForm({
          ...values,
          image_url: uploadedImageUrl,
        });
        form.reset();
      }

      if (type === "Edit") {
        let uploadedImageUrl = values.image_url;
        if (file.length > 0) {
          const res = await edgestore.publicFiles.upload({
            file: file[0],
            onProgressChange(progress) {
              setProgressUploadImage(progress);
            },
          });

          let imageUrlFromDB = String(productData?.image_url);

          if (imageUrlFromDB !== res.url.toString()) {
            await edgestore.publicFiles.delete({
              url: imageUrlFromDB,
            });
            uploadedImageUrl = res.url;
          }
        }

        handleProductForm({
          ...values,
          image_url: uploadedImageUrl,
        });
        form.reset();
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  }

  return (
    <div className="md:w-10/12 w-full mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {type === "Create" ? "Create" : "Edit"} Product
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row items-start mt-5 gap-5"
        >
          <div className="w-full md:w-1/2 flex md:items-center">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <SingleImageDropzone
                      className="w-full h-full border"
                      imageUrl={field.value}
                      setFile={setFile}
                      onFieldChange={field.onChange}
                      progressUploadImage={progressUploadImage}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col md:items-center gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Book"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0$"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryDropdown
                      value={field.value}
                      onChangeHandler={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full h-40">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description for product"
                      className="resize-none h-[80%]"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
                className="transition-all w-full"
              >
                {form.formState.isSubmitting && (
                  <Loader size={18} className="animate-spin mr-2" />
                )}
                {type === "Create" ? "Create" : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
