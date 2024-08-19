import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isImageUrl = (url: string) => {
  return /\.(jpg|jpeg|png|webp)$/.test(url);
};
