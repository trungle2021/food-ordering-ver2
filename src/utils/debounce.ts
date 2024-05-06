const debounce = <T extends unknown[]>(
    callback: (...args: T) => void,
    delay = 1000
  ): ((...args: T) => void) => {
    let timeout: NodeJS.Timeout;
  
    return (...args: T) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };
  