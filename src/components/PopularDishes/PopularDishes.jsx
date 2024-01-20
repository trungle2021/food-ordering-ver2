import React, { useEffect, useState } from "react";
import { PopularDish } from "./PopularDish/PopularDish";
import axios from "axios";
import { getPopularDishesApi } from "../../utils/api";
import styles from "./PopularDishes.module.css";

export const PopularDishes = () => {
  const [popularDishes, setPopularDishes] = useState([]);

  const getPopularDishes = async () => {
    try {
      const response = await axios.get(`${getPopularDishesApi}?limit=4`);
      setPopularDishes(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularDishes();
  }, []);

  const popularDishesItem = popularDishes.map((item) => {
    const dish = item.dish;
    const itemSold = item.count
    return (
      <li>
        <PopularDish
          key={dish._id}
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
      {popularDishesItem}
    </ul>
  );
};
