import { React, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const userId = '65741dbdc65e820e07b382bf'

  return (
    <AppContext.Provider value={{ isExpanded, setIsExpanded, userId }}>
      {children}
    </AppContext.Provider>
  );
};
