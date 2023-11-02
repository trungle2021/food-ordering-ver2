import { React, useState } from "react";
import { createContext } from "react";

export const LeftSideBarContext = createContext({});
export const LeftSideBarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <LeftSideBarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </LeftSideBarContext.Provider>
  );
};
