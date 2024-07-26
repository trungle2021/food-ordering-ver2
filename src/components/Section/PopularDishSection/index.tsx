import { PopularDishList } from "~/features/Dish/PopularDishList";
import { Section } from "../index";

export const PopularDishSection = ({limit}: {limit: number}) => {
  return (
    <Section
      sectionName="Popular Dishes"
      viewAllLink="/popular-dishes"
      content={<PopularDishList limit={limit} />}
    />
  );
};
