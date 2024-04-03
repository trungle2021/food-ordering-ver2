import { PopularDishList } from "../../../features/PopularDish/PopularDishList";
import { Section } from "../index";

export const PopularDishSection = () => {
  return (
    <Section
      sectionName="Popular Dishes"
      viewAllLink="/popular-dishes"
      content={<PopularDishList />}
    />
  );
};
