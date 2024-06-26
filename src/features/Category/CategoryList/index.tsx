import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";
import CategoryService from "../../../services/category/category-service";
import Category from "../../../interface/category/category";
import styles from "./styles.module.css";
import { Grid } from "@mui/material";

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const itemLimit = 6;
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
      return (
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={_id}>
          <CategoryItem iconLink={image} name={name} />
        </Grid>
      );
    }
  );

  return (
    <Grid container spacing={3} rowSpacing={2}>
      {categoryList}
    </Grid>
  );
};
