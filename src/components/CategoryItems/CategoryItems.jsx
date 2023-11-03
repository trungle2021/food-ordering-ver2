import React from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import {
  Baked,
  Burger,
  Beverage,
  Chicken,
  Pizza,
  SeaFood,
} from "../UI/Icon/Icon";

const CategoryItems = () => {
  return (
    <ul className="flex justify-evenly basis-32 gap-3">
      <CategoryItem icon={<Baked size={30} />} name={"Baked"} />
      <CategoryItem icon={<Burger size={30} />} name={"Burger"} />
      <CategoryItem icon={<Beverage size={30} />} name={"Beverage"} />
      <CategoryItem icon={<Chicken size={30} />} name={"Chicken"} />
      <CategoryItem icon={<Pizza size={30} />} name={"Pizza"} />
      <CategoryItem icon={<SeaFood size={30} />} name={"SeaFood"} />
    </ul>
  );
};

export default CategoryItems;
