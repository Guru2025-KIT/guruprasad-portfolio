import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const basePath = "/guruprasad-portfolio";

export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
