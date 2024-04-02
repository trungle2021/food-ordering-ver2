import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";
import CategoryService from "../../../services/category/category-service";
import Category from "../../../interface/category";
import styles from "./CategoryItems.module.css";

export const CategoryItems = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await CategoryService.fetchCategoryList(8);
      console.log(response);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryItems: React.ReactElement[] = categories.map(
    (item: Category) => {
      const { _id, image, name } = item;
      return <CategoryItem key={_id} iconLink={image} name={name} />;
    }
  );

  return (
    <ul className={`${styles["categories__container"]}`}>{categoryItems}</ul>
  );
};
