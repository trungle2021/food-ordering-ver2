import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PopularDish } from "../PopularDish/index";
import DishService from "../../../services/dish/dish-service";


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
      <li key={_id}>
        <PopularDish
          image={image}
          itemSold={itemSold}
          discount={discount}
          name={name}
          price={price}
          isFavorite={isFavorite}
          is_active={false}
          created_at={""}
          description={""}
          category={""} />
      </li>
    );
  });
  return (
    <ul className={`${styles["popular-dishes-container"]}`}>
      {popularDishList}
    </ul>
  );
};
