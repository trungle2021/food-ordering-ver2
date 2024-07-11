import { useEffect, useState } from "react";
import { PopularDish } from "../PopularDish/index";
import DishService from "../../../services/dish/dishService";
import { Grid } from "@mui/material";


export const PopularDishList = () => {
  const [popularDishes, setPopularDishes] = useState([]);

  const getPopularDishes = async () => {
    try {
      const response = await DishService.fetchPopularDishes(4);
      setPopularDishes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularDishes();
  }, []);

  const popularDishList = popularDishes.map((item: any) => {
    const { _id, image, discount, name, price, isFavorite } = item.dish;
    const itemSold = item.count;

    return (
      <Grid key={_id} item xs={12} sm={6} md={4} lg={4} xl={3}>
        <PopularDish
          _id={_id}
          image={image}
          itemSold={itemSold}
          discount={discount}
          name={name}
          price={price}
          isFavorite={isFavorite}
          is_active={false}
          created_at={""}
          description={""}
          category={""}
        />
      </Grid>
    );
  });
  return (
    <Grid container spacing={2} rowSpacing={2}>
      {popularDishList}
    </Grid>
  );
};
