import { React, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
 

  return (
    <AppContext.Provider value={{ isExpanded, setIsExpanded, userId }}>
      {children}
    </AppContext.Provider>
  );
};
