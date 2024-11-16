import { RecentOrderList } from "~/components/specific/RecentOrder/RecentOrderList";
import { Section } from "../index";
import { useState } from "react";

interface RecentOrderSectionProps {
  limit: number;
}

export const RecentOrderSection = ({ limit }: RecentOrderSectionProps) => {
  const [hasOrders, setHasOrders] = useState(false);
  return (
    <>
      {hasOrders && <Section
        sectionName="Recent Orders"
        viewAllLink="/recent-orders"
        content={<RecentOrderList limit={limit} onHasOrders={setHasOrders} />}
      />} 
    </>
  );
};
