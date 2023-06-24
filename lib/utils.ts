import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function createId(id: string): string {
  const len = id.length;
  let formatedId = id;

  if (len < 3) {
    formatedId = "0".repeat(2 / len) + formatedId;
  }
  return "#" + formatedId;
}

export function firstUppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
