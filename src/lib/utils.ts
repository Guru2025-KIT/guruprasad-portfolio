import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const basePath = "/guruprasad-portfolio";

export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  
  // Use jsDelivr CDN for videos to support HTTP Range Requests (206) on GitHub Pages
  if (path.startsWith("/video/")) {
    return `https://cdn.jsdelivr.net/gh/Guru2025-KIT/guruprasad-portfolio@main/public${path}`;
  }
  
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
