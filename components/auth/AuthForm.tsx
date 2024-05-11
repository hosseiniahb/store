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
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import SocialSignIn from "./SocialSignIn";
import { AuthFormSchema, AuthFormSchemaType } from "@/lib/schema";
import { login, signup } from "@/lib/actions/auth/actions";
import { toast } from "../ui/use-toast";

export function AuthForm() {
  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormSchemaType) {
    const result = await signup(values);
    console.log(result);

    if (result) {
      const { message } = JSON.parse(result);
      toast({
        title: "Authentication",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(message)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div className="md:w-10/12 w-full mx-auto flex flex-col items-start justify-center gap-4">
      <Link href="/">
        <Button variant="link" className="p-0">
          <ArrowLeft />
          Back to home
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full transition-all"
          >
            {form.formState.isSubmitting && (
              <Loader size={18} className="animate-spin mr-2" />
            )}
            Sign In
          </Button>
        </form>
      </Form>
      <span className="text-sm font-semibold mx-auto text-slate-700 py-5">
        Or signin with
      </span>
      <SocialSignIn isDisabled={form.formState.isSubmitting} />
    </div>
  );
}
