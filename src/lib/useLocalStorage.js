function getDataFromLocalStorage(keyName, defaultValue) {
  if (window !== "undefined") {
    const data = localStorage.getItem(keyName);
    const parsedValue = JSON.parse(data);
    return parsedValue || defaultValue;
  }
  return defaultValue;
}

export { getDataFromLocalStorage };
