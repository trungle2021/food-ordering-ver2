import { useEffect, useState, useContext } from "react";
import RecentOrder from "../RecentOrder";
import styles from "./styles.module.css";
import RecentOrderService from "~/services/recent-order/recent.order";
import { useSelector } from "react-redux";
import BaseDish from "~/interface/dish/base-dish";
import OrderDetail from "~/interface/order/order-detail.response";

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
        console.log(recentOrders)
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getRecentOrders();
  }, []);

  const recentOrdersItem = recentOrders.map((order: OrderDetail) => {
    const dish: BaseDish = order.dish;
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
