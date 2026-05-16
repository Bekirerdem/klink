import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware class name composer.
 * Combines clsx (conditional logic) with twMerge (conflict resolution).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
