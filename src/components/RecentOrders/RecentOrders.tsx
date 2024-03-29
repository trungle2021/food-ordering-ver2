import { useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import RecentOrder from "./RecentOrder/RecentOrder";
import styles from "./RecentOrders.module.css";
import { OrderResponse } from "../../interface/order/order-response";
import DishResponse from "../../interface/dish/dish";
import RecentOrderService from "../../services/recent-order/recent-order";
import { useContext } from "react";

export const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const user_id: string = useContext(AuthContext);

  const getRecentOrders = async () => {
    try {
      const response = await RecentOrderService.fetchRecentOrderList(
        4,
        user_id
      );
      setRecentOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentOrders();
  }, []);

  const recentOrdersItem = recentOrders.map((order: OrderResponse) => {
    const dish: DishResponse = order.order_detail.dish;
    return (
      <li key={order._id}>
        <RecentOrder
          image={dish.image}
          name={dish.name}
          price={dish.price}
          isFavorite={true}
        />
      </li>
    );
  });
  return (
    <ul className={`${styles["recent-orders-container"]}`}>
      {recentOrdersItem}
    </ul>
  );
};
