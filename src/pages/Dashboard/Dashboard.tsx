import { HeaderSection } from "../components/HeaderSection/HeaderSection";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { PopularDishSection } from "../components/PopularDishSection/PopularDishSection";
import { RecentOrderSection } from "../components/RecentOrderSection/RecentOrderSection";

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
