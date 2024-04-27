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
import { UserFormSchema, UserFormSchemaType } from "@/lib/schema";
import { Loader } from "lucide-react";
import { useTransition } from "react";

type UserFormProps = {
  type: "Edit" | "Create";
  userData?: UserFormSchemaType;
  handleUserForm: (data: UserFormSchemaType) => void;
};

export function UserForm({ type, userData, handleUserForm }: UserFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormSchemaType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      user_name: userData?.user_name || "",
      email: userData?.email || "",
      role: userData?.role || "user",
      phone: userData?.phone || "",
    },
  });

  function onSubmit(values: UserFormSchemaType) {
    startTransition(() => {
      handleUserForm(values);
      form.reset();
    });
  }

  return (
    <div className="md:w-10/12 w-full mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {type === "Create" ? "Create" : "Edit"} User
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-start space-y-5 mt-5"
        >
          <div className="w-full flex flex-col md:flex-row md:items-center gap-5 flex-wrap">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="admin or user" {...field} />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 2156800000" {...field} />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending || !form.formState.isValid}
            type="submit"
            className="transition-all"
          >
            {isPending && <Loader size={18} className="animate-spin mr-2" />}
            {type === "Create" ? "Create" : "Edit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
