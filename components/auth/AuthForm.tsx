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
import { ArrowLeft } from "lucide-react";
import { useFormStatus } from "react-dom";
import SocialSignIn from "./SocialSignIn";
import { LoginFormSchema, LoginFormSchemaType } from "@/lib/schema";

export function AuthForm() {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormSchemaType) {
    console.log(values);
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
      {/* <Form {...form}>
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
                  <Input placeholder="example@gmail.com" {...field} />
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
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-500" />
              </FormItem>
            )}
          />
          <LoginButton />
        </form>
      </Form>
      <span className="text-sm font-semibold mx-auto text-slate-700 py-5">
        Or signin with
      </span> */}
      <SocialSignIn />
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      Sign In
    </Button>
  );
}
