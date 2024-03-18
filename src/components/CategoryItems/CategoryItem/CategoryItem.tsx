import React from "react";
import styles from "./CategoryItem.module.css";

type CategoryProps = {
  iconLink: string;
  name: string;
};

const CategoryItem = ({ iconLink, name }: CategoryProps) => {
  return (
    <li className={`${styles["category-item"]}`}>
      <img src={iconLink} />
      <span>{name}</span>
    </li>
  );
};

export default CategoryItem;
