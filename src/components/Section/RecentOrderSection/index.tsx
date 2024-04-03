import { RecentOrderList } from "../../../features/RecentOrder/RecentOrderList/index";
import { Section } from "../index";
export const RecentOrderSection = () => {
  return (
    <Section
      sectionName="Recent Orders"
      viewAllLink="/recent-orders"
      content={<RecentOrderList />}
    />
  );
};
