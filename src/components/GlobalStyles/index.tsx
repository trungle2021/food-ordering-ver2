import 'react-toastify/dist/ReactToastify.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import "./GlobalStyles.css";
import React, { ReactNode } from "react";

interface GlobalStylesProps {
  children: ReactNode;
}

export const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
  return <>{children}</>;
};
