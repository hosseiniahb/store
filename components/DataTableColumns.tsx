"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Settings } from "lucide-react";
import { cn, formatDateTime, formatPrice } from "@/lib/utils";
import DeleteUser from "@/components/admin/dashboard/users/DeleteUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteProduct from "./admin/dashboard/products/DeleteProduct";
import { Tables } from "@/lib/types/supabase";
import DeleteCategory from "./admin/dashboard/categories/DeleteCategory";
import { T_OrderProduct, T_OrderUser } from "@/lib/types";
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

export const ColumnOrderUserTable: ColumnDef<T_OrderUser>[] = [
  {
    accessorKey: "status",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.original?.payment_details.status;

      return (
        <span
          className={cn("rounded-full text-center p-2 font-bold bg-accent", {
            "bg-green-500 text-white": status === "paid",
          })}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const price = row.original?.payment_details.amount;
      const formatted = formatPrice(price);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const provider = String(row.original?.payment_details.provider);

      return (
        <span className="rounded-full text-center p-2 font-bold bg-indigo-500 text-white">
          {provider}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = String(row.original?.payment_details.created_at);
      const formatted = formatDateTime(createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <Settings />,
    cell: ({ row }) => {
      const orderId = row.original?.payment_details.order_id;

      return (
        <Link
          href={`/profile/orders/${orderId}`}
          className="text-primary transition-all hover:underline"
        >
          Invoice details
        </Link>
      );
    },
  },
];

export const ColumnOrderProductTable: ColumnDef<T_OrderProduct>[] = [
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.products.image_url;
      return (
        <Image
          src={imageUrl}
          width={90}
          height={90}
          alt="product image"
          loading="lazy"
          className="object-cover object-center rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "products.title",
    header: "Title",
    cell: ({ row }) => {
      const { id, title } = row.original.products;

      return (
        <Link
          href={`/product/${id}`}
          className="text-primary transition-all hover:underline"
        >
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price } = row.original.products;
      const formatted = formatPrice(price);

      return <span>{formatted}</span>;
    },
  },
];
