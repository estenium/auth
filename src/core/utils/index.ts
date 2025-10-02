import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a random timeout value between 1000 and 3000 in steps of 500 milliseconds.
 * @returns a random timeout.
 */
export function getTimeout(min = 1000, max = 3000, step = 500): number {
  const steps = (max - min) / step + 1;
  const randomStep = Math.floor(Math.random() * steps);
  return min + randomStep * step;
}
