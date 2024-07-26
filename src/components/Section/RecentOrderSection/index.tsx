import { RecentOrderList } from "~/features/Order/RecentOrder/RecentOrderList";
import { Section } from "../index";
export const RecentOrderSection = ({limit}: {limit: number}) => {
  return (
    <Section
      sectionName="Recent Orders"
      viewAllLink="/recent-orders"
      content={<RecentOrderList limit={limit} />}
    />
  );
};
