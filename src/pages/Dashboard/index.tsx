import { HeaderSection } from "../../components/Section/HeaderSection/index";
import { CategorySection } from "../../components/Section/CategorySection/index";
import { PopularDishSection } from "../../components/Section/PopularDishSection/index";
import { RecentOrderSection } from "../../components/Section/RecentOrderSection/index";

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
