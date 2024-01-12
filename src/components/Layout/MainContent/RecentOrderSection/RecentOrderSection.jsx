import React from "react";
import { RecentOrders } from "../../../RecentOrders/RecentOrders";
export const RecentOrderSection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h2 className="section__title">Recent Orders</h2>
        <a
          href="#
        "
        >
          View all
        </a>
      </div>
      <RecentOrders />
    </div>
  );
};
