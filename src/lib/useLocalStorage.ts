export function getDataFromLocalStorage(
  keyName: string,
  defaultValue: string = ""
): string {
  if (typeof window !== "undefined") {
    const data: string | null = localStorage.getItem(keyName);
    const parsedValue = JSON.parse(data || "");
    return parsedValue || defaultValue;
  }
  return defaultValue;
}
