import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Dish } from "../PopularDish/index";
import PopularDishService from "../../../services/popular-dish/popular.dish";
import DishResponse from "../../../interface/dish/dish";

export const PopularDishList = () => {
  const [popularDishes, setPopularDishes] = useState([]);

  const getPopularDishes = async () => {
    try {
      const response = await PopularDishService.fetchPopularDishList(4);
      setPopularDishes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularDishes();
  }, []);

  const popularDishList = popularDishes.map((item: any) => {
    const { _id, image, discount, name, price, isFavorite }: DishResponse =
      item.dish;
    const itemSold = item.count;

    return (
      <li key={_id}>
        <Dish
          image={image}
          itemSold={itemSold}
          discount={discount}
          name={name}
          price={price}
          isFavorite={isFavorite}
        />
      </li>
    );
  });
  return (
    <ul className={`${styles["popular-dishes-container"]}`}>
      {popularDishList}
    </ul>
  );
};
