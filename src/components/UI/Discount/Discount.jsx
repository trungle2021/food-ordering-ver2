import React from "react";
import styles from "./Discount.module.css";

const Discount = ({ amount }) => {
  return <span className={`${styles["discount"]}`}>{amount}% Off</span>;
};

export default Discount;
