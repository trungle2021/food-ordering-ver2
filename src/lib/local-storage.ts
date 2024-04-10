function getDataFromLocalStorage(
  keyName: string,
  defaultValue: string | object = ""
): string | object {
  if (typeof window !== "undefined") {
    const data: string | null = localStorage.getItem(keyName);
    const parsedValue = JSON.parse(data || "");
    return parsedValue || defaultValue;
  }
  return defaultValue;
}

function setDataToLocalStorage(keyName: string, value: string | object): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
}

export default {
  getDataFromLocalStorage,
  setDataToLocalStorage,
};
