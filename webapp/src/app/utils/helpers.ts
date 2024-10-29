import dayjs from "dayjs";
import { UserDefinedKeys } from "./types";

type Locale = "vi-VN" | "en-US" | "fr-FR" | "ja-JP";

export const formatCurrency = (
  amount: number | string | null | undefined,
  locale: Locale = "vi-VN",
) => {
  if (typeof amount === "string") {
    amount = parseInt(amount);
  }
  let returnAmount = 0;

  if (amount === null || amount === undefined) {
    return returnAmount.toLocaleString(locale, {
      style: "currency",
      currency: "VND",
    });
  }

  if (locale === "vi-VN") {
    returnAmount = amount * 1000;
  }

  return returnAmount.toLocaleString(locale, {
    style: "currency",
    currency: "VND",
  });
};

export const formatUnixToLocal = (
  unixTimestamp: number,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
  locale: string = "vi-VN",
) => {
  const milliseconds = unixTimestamp;
  const date = new Date(milliseconds);
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const formatDateToLocal = (
  dateStr?: string,
  locale: string = "vi-VN",
) => {
  if (dateStr === null || dateStr === undefined) return "";

  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatToTimeDifference = (
  timeDifference: number,
  locale: string = "vi-VN",
) => {
  const options: Intl.RelativeTimeFormatOptions = {
    numeric: "auto",
  };
  const formatter = new Intl.RelativeTimeFormat(locale, options);

  if (timeDifference < 60000) {
    return formatter.format(-Math.floor(timeDifference / 1000), "second");
  } else if (timeDifference < 3600) {
    return formatter.format(-Math.floor(timeDifference / 60000), "minute");
  } else if (timeDifference < 86400) {
    return formatter.format(-Math.floor(timeDifference / 3600000), "hour");
  } else {
    return formatter.format(-Math.floor(timeDifference / 86400000), "day");
  }
};

export const calculateDateToNow = ({
  time,
  format = false,
  locale = "vi-VN",
}: {
  time: string | number;
  locale?: string;
  format?: boolean;
}) => {
  if (typeof time === "string") {
    time = Date.parse(time);
  }
  //exclude the milisecond from Date
  const today = Math.floor(Date.now());

  const timeDifference = today - time;
  return format
    ? formatToTimeDifference(timeDifference, locale)
    : timeDifference;
};

export const dateToLocalISOString = (date: dayjs.Dayjs) => {
  const tzOffset = new Date().getTimezoneOffset();
  const dt = dayjs(date).utcOffset(tzOffset, true);
  return dt.toISOString();
};

export const base64ToBlob = (base64: string, filename: string): File | null => {
  try {
    // Check for data URI prefix and remove if present
    const base64Data = base64.startsWith("data:image")
      ? base64.split(",")[1]
      : base64;

    // Decode base64
    const bstr = atob(base64Data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Determine MIME type from base64 string
    const mime = base64.match(/:(.*?);/)?.[1] || "image/jpeg";

    // Create a File object
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error converting base64 to File:", error);
    return null;
  }
};

export function ensureBase64Avatar(avatarString?: string) {
  if (avatarString) {
    const base64Prefix = "data:image/jpeg;base64,";
    const urlPattern = /^(http|https):\/\//;
    const filePattern = /\.(jpeg|jpg|png|gif)$/i;

    // Check if the string is a URL
    if (urlPattern.test(avatarString)) {
      return avatarString;
    }

    // Check if the string is a file path
    if (filePattern.test(avatarString)) {
      return avatarString;
    }

    // Check if the string is already a base64-encoded image
    if (!avatarString.startsWith(base64Prefix)) {
      return base64Prefix + avatarString;
    }

    return avatarString;
  }
  return;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export function isNonValue(value: unknown): value is undefined | null {
  return (
    value === undefined || value === null || value === "" || Number.isNaN(value)
  );
}

export function combineArraysLoose<T extends object, U extends object>(
  array1: T[] = [],
  array2: U[] = [],
  fields: UserDefinedKeys<T & U>[],
): (T & Partial<U>)[] {
  // console.log("arr1: ", array1);
  // console.log("arr2: ", array2);
  return array1.map((item1) => {
    const match = array2.find((item2) => {
      return fields.every((field) => {
        const value1 = field in item1 ? item1[field as keyof T] : undefined;
        const value2 = field in item2 ? item2[field as keyof U] : undefined;
        return value1 === value2;
      });
    });

    return match ? { ...item1, ...match } : item1;
  });
}
