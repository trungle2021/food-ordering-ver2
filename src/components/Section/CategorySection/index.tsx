import { CategoryList } from "~/features/Category/CategoryList";
import { Section } from "../index";

export const CategorySection = () => {
  return (
    <Section
      sectionName="Categories"
      viewAllLink="/categories"
      content={<CategoryList />}
    />
  );
};
