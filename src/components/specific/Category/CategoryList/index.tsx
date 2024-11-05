import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";
import { Grid } from "@mui/material";
import CategoryService from "~/services/category/categoryService";
import CategoryProps from "~/interface/category/category";

export const CategoryList = ({limit}: {limit: number}) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await CategoryService.getCategoryList(limit);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryList: React.ReactElement[] = categories.map(
    (item: CategoryProps) => {
      const { _id, image, name } = item;
      return (
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={_id}>
          <CategoryItem iconLink={image ?? '/default-category-image.jpg'} name={name} />
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
