import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the number has a valid precision and scale.
 * Precision: Total number of digits (integer + decimal parts).
 * Scale: Number of digits after the decimal point.
 *
 * @param {number} value - The number to check.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValidPrecisionAndScale(value: number): boolean {
  const [integerPart, decimalPart] = value.toString().split(".");
  const integerLength = integerPart?.length ?? 0;
  const decimalLength = decimalPart?.length ?? 0;

  return decimalLength <= 2 && integerLength + decimalLength <= 12;
}

/**
 * Formats the amount to ensure it has two decimal places if necessary.
 *
 * @param {number} value - The number to format.
 * @returns {string} - The formatted amount as a string.
 */
export function formatAmount(value: number): string {
  const [, decimalPart] = value.toString().split(".");
  if (!decimalPart) {
    return `${value}.00`;
  }
  if (decimalPart && decimalPart.length === 1) {
    return `${value}0`;
  }
  return value.toString();
}
