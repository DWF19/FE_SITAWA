import { format } from "date-fns-tz";
import { toZonedTime } from "date-fns-tz/toZonedTime";

export const convertToLongDate = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const day = date.getDate();
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    return `${day} ${month} ${year}`;
  };

  export const formatDate = (dateStrings: string[]): string[] => {
    return dateStrings.map((dateString) => {
      const zonedDate = toZonedTime(dateString, "Asia/Makassar"); 
      return format(zonedDate, "HH : mm : ss"); 
    });
  };
  export const convertToLongDateTimeWithTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  };