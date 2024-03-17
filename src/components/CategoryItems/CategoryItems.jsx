import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import CategoryService from "../../services/CategoryService";

import styles from "./CategoryItems.module.css";

export const CategoryItems = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await CategoryService.fetchCategoryList(8);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryItems = categories.map((item) => {
    return (
      <CategoryItem key={item._id} iconLink={item.image} name={item.name} />
    );
  });

  return (
    <ul className={`${styles["categories__container"]}`}>{categoryItems}</ul>
  );
};
