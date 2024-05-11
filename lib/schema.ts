import { z } from "zod";

export const AuthFormSchema = z.object({
  email: z.string().email({ message: "email is required." }),
  password: z
    .string()
    .min(6, { message: "The password must be greater than 6" }),
});

export const UserFormSchema = z.object({
  user_name: z.string().min(3, { message: "username is required." }),
  email: z.string().email({ message: "email is required." }),
  role: z.enum(["user", "admin"]),
  phone: z.string().optional(),
});

export const ProductFormSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z
    .number()
    .int({ message: "You cannot enter a decimal number." })
    .nonnegative({ message: "The price can start from 0." }),
  image_url: z.string().url({ message: "Image is required." }),
  count: z
    .number()
    .int({ message: "You cannot enter a decimal number." })
    .nonnegative({ message: "The count can start from 0." }),
  category_id: z.string().min(1, { message: "Category select is required" }),
});

export const CategoryFormSchema = z.object({
  name: z.string().min(3, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

export const UserInfoFormSchema = z.object({
  user_name: z.string().min(3, { message: "username is required." }),
  email: z.string().email({ message: "email is required." }),
  avatar_url: z.string().url({ message: "Image is required." }),
  phone: z.string().optional(),
});

export type AuthFormSchemaType = z.infer<typeof AuthFormSchema>;
export type UserFormSchemaType = z.infer<typeof UserFormSchema>;
export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;
export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>;
export type UserInfoFormSchemaType = z.infer<typeof UserInfoFormSchema>;
