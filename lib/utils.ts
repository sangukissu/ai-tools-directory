import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function sanitizeSearchTerm(term: string): string {
  // Remove any characters that aren't alphanumeric, spaces, or common punctuation
  return term.replace(/[^a-zA-Z0-9\s.,!?-]/g, '').trim()
}