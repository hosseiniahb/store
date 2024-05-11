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
import { UserInfoFormSchema, UserInfoFormSchemaType } from "@/lib/schema";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";

type UserFormProps = {
  userData?: UserInfoFormSchemaType;
  handleUserForm: (data: UserInfoFormSchemaType) => void;
};

export function UserInfoForm({ userData, handleUserForm }: UserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File[]>([]);
  const [progressUploadImage, setProgressUploadImage] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  const form = useForm<UserInfoFormSchemaType>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: {
      user_name: userData?.user_name,
      email: userData?.email,
      avatar_url: userData?.avatar_url,
      phone: userData?.phone || "",
    },
  });

  function onSubmit(values: UserInfoFormSchemaType) {
    try {
      startTransition(async () => {
        let uploadedImageUrl = values.avatar_url;
        if (file.length > 0) {
          const res = await edgestore.publicFiles.upload({
            file: file[0],
            onProgressChange(progress) {
              setProgressUploadImage(progress);
            },
          });

          let imageUrlFromDB =
            typeof userData?.avatar_url === "string"
              ? userData.avatar_url
              : String(userData?.avatar_url);

          if (imageUrlFromDB !== res.url.toString()) {
            if (!imageUrlFromDB.includes("https://avatars")) {
              await edgestore.publicFiles.delete({
                url: imageUrlFromDB,
              });
            }
            uploadedImageUrl = res.url;
          }
        }

        handleUserForm({
          ...values,
          avatar_url: uploadedImageUrl,
        });
        form.reset();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-4 pb-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row items-start mt-5 gap-5"
        >
          <div className="w-full md:w-1/2 flex md:items-center">
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <SingleImageDropzone
                      className="w-full h-full border"
                      imageUrl={field.value}
                      setFile={setFile}
                      onFieldChange={field.onChange}
                      progressUploadImage={progressUploadImage}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John" disabled={isPending} {...field} />
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
                    <Input
                      placeholder="example@gmail.com"
                      disabled={isPending}
                      {...field}
                    />
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
                    <Input
                      placeholder="+1 2156800000"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button
                disabled={isPending || !form.formState.isValid}
                type="submit"
                className="transition-all"
              >
                {isPending && (
                  <Loader size={18} className="animate-spin mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
