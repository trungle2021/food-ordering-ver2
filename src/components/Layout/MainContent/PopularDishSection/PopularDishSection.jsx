import React from "react";
import { PopularDishes } from "../../../PopularDishes/PopularDishes";
export const PopularDishSection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h2 className="section__title">Popular Dishes</h2>
        <a href="">View All</a>
      </div>
      <PopularDishes />
    </div>
  );
};
