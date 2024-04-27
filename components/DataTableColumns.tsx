"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Settings, Trash } from "lucide-react";
import { cn, formatDateTime, formatPrice } from "@/lib/utils";
import DeleteUser from "@/components/admin/dashboard/users/DeleteUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteProduct from "./admin/dashboard/products/DeleteProduct";
import { Tables } from "@/lib/types/supabase";
import DeleteCategory from "./admin/dashboard/categories/DeleteCategory";
import Image from "next/image";

export const ColumnUserTable: ColumnDef<Tables<"users">>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "user_name",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = String(row.getValue("role"));

      return (
        <span
          className={cn("rounded-full text-center p-1 font-bold bg-accent", {
            "bg-primary text-white": role === "admin",
          })}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = String(row.getValue("created_at"));
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "modified_at",
    header: "Modified At",
    cell: ({ row }) => {
      const modifiedAt = String(row.getValue("modified_at"));
      const formatted = formatDateTime(modifiedAt);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <Settings />,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/users/edit/${user?.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Pencil size={17} />
              Edit
            </Button>
          </Link>
          <DeleteUser userId={user?.id!} />
        </div>
      );
    },
  },
];

export const ColumnProductTable: ColumnDef<Tables<"products">>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = formatPrice(price);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "count",
    header: "Count",
    cell: ({ row }) => {
      const count = row.original?.count;

      return <span>{count}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = String(row.getValue("created_at"));
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "modified_at",
    header: "Modified At",
    cell: ({ row }) => {
      const modifiedAt = String(row.getValue("modified_at"));
      const formatted = formatDateTime(modifiedAt);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <Settings />,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye size={17} />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/products/edit/${product?.id!}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Pencil size={17} />
              Edit
            </Button>
          </Link>
          <DeleteProduct productId={product?.id!} />
        </div>
      );
    },
  },
];

export const ColumnCategoryTable: ColumnDef<Tables<"product_category">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = String(row.getValue("created_at"));
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "modified_at",
    header: "Modified At",
    cell: ({ row }) => {
      const modifiedAt = String(row.getValue("modified_at"));
      const formatted = formatDateTime(modifiedAt);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <Settings />,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/categories/edit/${category?.id!}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Pencil size={17} />
              Edit
            </Button>
          </Link>
          <DeleteCategory categoryId={category?.id!} />
        </div>
      );
    },
  },
];

export const ColumnOrderTable: ColumnDef<
  Tables<"order_details" | "users" | "payment_details">
>[] = [
  {
    accessorKey: "user_name",
    header: "Customer",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = String(row.getValue("created_at"));
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Payment",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "actions",
    header: () => <Settings />,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-3">
          <DeleteCategory categoryId={category?.id!} />
        </div>
      );
    },
  },
];

export const ColumnProductFavoritesUserTable: ColumnDef<Tables<"products">>[] =
  [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => {
        const image_url = String(row.getValue("image_url"));

        <Image
          alt="product pic"
          src={image_url || "/images/products/beats.jpg"}
          width={200}
          height={200}
          className="rounded-full object-cover object-center"
        />;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      id: "actions",
      header: () => <Settings />,
      cell: () => {
        return (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trash size={17} />
              Remove
            </Button>
          </div>
        );
      },
    },
  ];

export const ColumnOrderUserTable: ColumnDef<
  Tables<"order_details" | "users" | "payment_details">
>[] = [
  {
    accessorKey: "status",
    header: "Payment",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = String(row.getValue("created_at"));
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
