import React from "react";
import { CategoryItems } from "../../../CategoryItems/CategoryItems";

export const CategorySection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h1 className="section__title">Category</h1>
        <a href="">View all</a>
      </div>
      <CategoryItems />
    </div>
  );
};
