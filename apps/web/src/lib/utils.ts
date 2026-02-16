import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LocalUser = {
  firstName?: string;
  lastName?: string;
};

export const getProfileInitials = (): string => {
  if (typeof window === "undefined") return "U";
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return "U";
    const parsed = JSON.parse(raw) as LocalUser;
    const parts = [parsed.firstName, parsed.lastName].filter(Boolean) as string[];
    if (!parts.length) return "U";
    return parts
      .map((part) => part.trim()[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  } catch {
    return "U";
  }
};
