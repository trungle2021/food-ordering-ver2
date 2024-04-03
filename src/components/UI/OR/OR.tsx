import React from "react";
import styles from "./OR.module.css";
export const OR = ({ text }) => {
  return (
    <div className={`${styles["OR-container"]}`}>
      <div className="line-thin"></div>
      <span>{text}</span>
      <div className="line-thin"></div>
    </div>
  );
};
