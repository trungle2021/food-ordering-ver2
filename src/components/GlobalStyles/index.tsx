import "./GlobalStyles.css";
import 'react-toastify/dist/ReactToastify.css'
import React, { ReactNode } from "react";

interface GlobalStylesProps {
  children: ReactNode;
}

export const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
  return <>{children}</>;
};
