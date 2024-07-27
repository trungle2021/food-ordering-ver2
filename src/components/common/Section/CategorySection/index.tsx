import { CategoryList } from "~/components/specific/Category/CategoryList/index";
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
