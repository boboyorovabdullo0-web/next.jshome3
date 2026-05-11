import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatName(user: { firstName: string; lastName: string }) {
  return `${user.firstName} ${user.lastName}`;
}
