import { useEffect, useState, useContext } from "react";
import RecentOrder from "../RecentOrder";
import styles from "./styles.module.css";
import { OrderResponse } from "~/interface/order/order.response";
import DishResponse from "~/interface/dish/dish";
import RecentOrderService from "~/services/recent-order/recent.order";
import { useSelector } from "react-redux";

export const RecentOrderList: React.FC = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const auth = useSelector((state: any) => state.auth);
  const user_id = auth.user?._id;
  const getRecentOrders = async () => {
    try {
      if (user_id) {
        const response = await RecentOrderService.fetchRecentOrderList(
          4,
          user_id
        );
        setRecentOrders(response.data);
      }
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
