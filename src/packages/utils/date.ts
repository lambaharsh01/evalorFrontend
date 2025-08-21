import { format, getMonth, getYear, parse } from "date-fns";

export const currentFYM = (): string => {
  const now = new Date();
  const year = getYear(now);
  const month = getMonth(now); // 0 = Jan

  const fyStart = month >= 3 ? year : year - 1;
  const fyEnd = fyStart + 1;

  return `${fyStart}-${fyEnd} ${format(now, "MMMM")}`;
};

export const FYMtoDate = (financialYear: string, month: string): Date | null => {
  try {
    const [fyStartStr, fyEndStr] = financialYear.split("-");
    const fyStart = parseInt(fyStartStr, 10);
    const fyEnd = parseInt(fyEndStr, 10);

    const parsedMonth = parse(month, "MMMM", new Date());
    const monthIndex = getMonth(parsedMonth);

    const year = monthIndex >= 3 ? fyStart : fyEnd;

    return new Date(year, monthIndex, 1);
  } catch (e) {
    console.error("Invalid input:", e);
    return null;
  }
};
