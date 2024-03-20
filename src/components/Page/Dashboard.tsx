import { HeaderSection } from "../HeaderSection/HeaderSection";
import { CategorySection } from "../CategorySection/CategorySection";
import { PopularDishSection } from "../PopularDishSection/PopularDishSection";
import { RecentOrderSection } from "../RecentOrderSection/RecentOrderSection";

export const Dashboard = () => {
  return (
    <>
      <HeaderSection />
      <img style={{ width: "100%" }} src="/BannerMain.png" />
      <CategorySection />
      <PopularDishSection />
      <RecentOrderSection />
    </>
  );
};
