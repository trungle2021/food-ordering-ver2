import { CategoryList } from "~/features/Category/CategoryList";
import { Section } from "../index";

export const CategorySection = ({limit}: {limit: number}) => {
  return (
    <Section
      sectionName="Categories"
      viewAllLink="/categories"
      content={<CategoryList limit={limit} />}
    />
  );
};
