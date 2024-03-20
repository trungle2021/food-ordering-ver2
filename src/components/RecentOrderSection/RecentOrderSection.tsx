import React from "react";
import { RecentOrders } from "../RecentOrders/RecentOrders";
import { Link } from "react-router-dom";

export const RecentOrderSection = () => {
  return (
    <div className="section">
      <div className="section__header">
        <h1 className="section__title">Recent Orders</h1>
        <Link to="/recent-orders">View all</Link>
      </div>
      <RecentOrders />
    </div>
  );
};
