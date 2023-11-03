import { React, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <AppContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </AppContext.Provider>
  );
};
