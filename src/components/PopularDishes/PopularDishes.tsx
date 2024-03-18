import React, { useEffect, useState } from "react";

import styles from "./PopularDishes.module.css";
import { Dish } from "../Dish/Dish";
import PopularDishService from "../../services/popular-dish/popular-dish";

export const PopularDishes = () => {
  const [popularDishes, setPopularDishes] = useState([]);

  const getPopularDishes = async () => {
    try {
      const response = await PopularDishService.fetchPopularDishList(4);
      setPopularDishes(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularDishes();
  }, []);

  const popularDishItems = popularDishes.map((item) => {
    const dish = item.dish;
    const itemSold = item.count;
    return (
      <li key={dish._id}>
        <Dish
          imageLink={dish.image}
          itemSold={itemSold}
          discount={dish.discount}
          name={dish.name}
          price={dish.price}
          isFavorite={true}
        />
      </li>
    );
  });
  return (
    <ul className={`${styles["popular-dishes-container"]}`}>
      {popularDishItems}
    </ul>
  );
};
