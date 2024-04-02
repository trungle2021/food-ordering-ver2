import { PopularDishes } from "../PopularDishes/PopularDishes";
import { Link } from "react-router-dom";

export const PopularDishSection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h1 className="section__title">Popular Dishes</h1>
        <Link to="/popular-dishes">View All</Link>
      </div>
      <PopularDishes />
    </div>
  );
};
