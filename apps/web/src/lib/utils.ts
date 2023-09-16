import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomHexColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
