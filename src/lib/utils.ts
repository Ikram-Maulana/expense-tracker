import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
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

/**
 * The function `formatToLocaleDate` takes a date object and a pattern as input, then formats the date
 * to a localized string based on the pattern and timezone "Asia/Jakarta".
 * @param {Date} date - The `date` parameter is a JavaScript `Date` object representing the date and
 * time that you want to format.
 * @param {string} pattern - The `pattern` parameter in the `formatToLocaleDate` function is a string
 * that represents the format in which you want the date to be displayed. For example, it could be
 * "YYYY-MM-DD HH:mm:ss" to display the date in the format "year-month-day hour:minute:
 * @returns The function `formatToLocaleDate` is returning a formatted date string based on the input
 * `date` and `pattern`. The date is being converted to the timezone "Asia/Jakarta" using the `dayjs`
 * library and then formatted according to the provided `pattern`.
 */
export function formatToLocaleDate(date: Date, pattern: string): string {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);
  return dayjs(date).tz("Asia/Jakarta").format(pattern);
}
