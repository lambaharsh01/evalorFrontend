const isObject = (value: any): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const convertQueryString = (object: string | number): string => {
  if (!object || !isObject(object) || !Object.values(object).length) return "";

  const queryParameters: string[] = [];

  for (const key in object) {
    if (!object[key]) continue;
    queryParameters.push(`${key}=${object[key]}`);
  }

  return queryParameters.length ? "?" + queryParameters.join("&") : "";
};
