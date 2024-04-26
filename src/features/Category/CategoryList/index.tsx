import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";
import CategoryService from "../../../services/category/category.service";
import Category from "../../../interface/category";
import styles from "./styles.module.css";

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const itemLimit = 8;
      const response = await CategoryService.fetchCategoryList(itemLimit);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryList: React.ReactElement[] = categories.map(
    (item: Category) => {
      const { _id, image, name } = item;
      return <CategoryItem key={_id} iconLink={image} name={name} />;
    }
  );

  return (
    <ul className={`${styles["categories__container"]}`}>{categoryList}</ul>
  );
};
