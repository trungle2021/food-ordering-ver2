import React from "react";
import styles from './CategoryItem.module.css';

const CategoryItem = ({ iconLink, name }) => {
  return (
    <li className={`${styles['category-item']}`}>
      <img src={iconLink} />
      <span>{name}</span>
    </li>
  );
};

export default CategoryItem;
