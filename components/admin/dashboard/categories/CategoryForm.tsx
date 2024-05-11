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
import { CategoryFormSchema, CategoryFormSchemaType } from "@/lib/schema";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type CategoryFormProps = {
  type: "Edit" | "Create";
  categoryData?: CategoryFormSchemaType;
  handleCategoryForm: (data: CategoryFormSchemaType) => void;
};

export function CategoryForm({
  type,
  categoryData,
  handleCategoryForm,
}: CategoryFormProps) {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: categoryData?.name || "",
      description: categoryData?.description || "",
    },
  });

  function onSubmit(values: CategoryFormSchemaType) {
    handleCategoryForm(values);
    form.reset();
  }

  return (
    <div className="md:w-10/12 w-full mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {type === "Create" ? "Create" : "Edit"} Category
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-start space-y-5 mt-5"
        >
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 flex-wrap">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone"
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
              name="description"
              render={({ field }) => (
                <FormItem className="w-full h-40">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description for category"
                      className="resize-none h-[80%]"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
            className="transition-all"
          >
            {form.formState.isSubmitting && (
              <Loader size={18} className="animate-spin mr-2" />
            )}
            {type === "Create" ? "Create" : "Edit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
