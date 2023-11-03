import React from "react";
import Dish from "./Dish/Dish";

const PopularDishes = () => {
  return (
    <ul className="flex justify-evenly basis-32 gap-3">
      <Dish
        image={"/food/Food1.png 2x"}
        imageSize={30}
        discount={15}
        name={"Fish Burger"}
        price={5.59}
        isFavorite={true}
      />
      <Dish
        image={"/food/Food2.png 2x"}
        imageSize={30}
        discount={25}
        name={"Beef Burger"}
        price={5.59}
        isFavorite={false}
      />
      <Dish
        image={"/food/Food3.png 2x"}
        imageSize={30}
        name={"Cheese Burger"}
        price={5.59}
        isFavorite={false}
      />
    </ul>
  );
};

export default PopularDishes;
