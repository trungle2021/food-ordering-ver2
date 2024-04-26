function getDataFromLocalStorage(
  keyName: string,
): string | object | null {
  if (typeof window !== "undefined") {
    const data: string | null = localStorage.getItem(keyName);
    if(!data){
      return null;
    }
    return JSON.parse(data);
  }
  return null;
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
