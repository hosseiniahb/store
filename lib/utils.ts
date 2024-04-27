import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
): string {
  const paramsString = params.toString();
  const query = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}/${query}`;
}

export function convertFileToUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function handleError(error: unknown) {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
}
