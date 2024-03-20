import { CategoryItems } from "../CategoryItems/CategoryItems";
import { Link } from "react-router-dom";
export const CategorySection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h1 className="section__title">Category</h1>
        <Link to="/categories">View all</Link>
      </div>
      <CategoryItems />
    </div>
  );
};
