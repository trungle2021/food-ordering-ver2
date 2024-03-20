import { useEffect, useState } from "react";
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

  const popularDishItems = popularDishes.map((item: any) => {
    const { _id, image, discount, name, price, isFavorite } = item.dish;
    const itemSold = item.count;

    return (
      <li key={_id}>
        <Dish
          imageLink={image}
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
      {popularDishItems}
    </ul>
  );
};
