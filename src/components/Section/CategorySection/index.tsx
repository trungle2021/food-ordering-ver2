import { Link } from "react-router-dom";
import { Section } from "../index";
import { CategoryList } from "../../../features/Category/CategoryList";

export const CategorySection = () => {
  return (
    <Section
      sectionName="Categories"
      viewAllLink="/categories"
      content={<CategoryList />}
    />
  );
};
