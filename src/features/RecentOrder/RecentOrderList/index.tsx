import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecentOrder from "../RecentOrder";
import styles from "./styles.module.css";
import BaseDish from "~/interface/dish/base-dish";
import OrderDetail from "~/interface/order/order-detail.response";
import Order from "~/interface/order/order.response";
import OrderService from "~/services/order/order-serivce";
import { Grid } from "@mui/material";

function getHighestPriceItem(orderDetailsArray: Array<OrderDetail>): BaseDish | null {
  let highestPrice = 0;
  let highestPriceItem: BaseDish | null = null;
  for (let i = 0; i <= orderDetailsArray.length; i++) {
    const item = orderDetailsArray[i]?.dish;
    if (item && item.price > highestPrice) {
      highestPrice = item.price;
      highestPriceItem = item;
    }
  }
  return highestPriceItem;
}

export const RecentOrderList: React.FC = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const user_id = auth.user?._id;
  const getRecentOrders = async () => {
    try {
      if (user_id) {
        const response = await OrderService.fetchRecentOrderList(
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

  const recentOrdersItem = recentOrders.map((order: Order) => {
    let orderDetailsList = order.order_details
    let orderDate = new Date(order.order_date).toLocaleDateString()
    if (orderDetailsList.length > 0) {
      const itemHighestPrice = getHighestPriceItem(orderDetailsList)
      if (itemHighestPrice) {
        return (
          <Grid key={order._id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <RecentOrder
              image={itemHighestPrice?.image ?? ''}
              name={itemHighestPrice?.name ?? ''}
              price={itemHighestPrice?.price ?? 0}
              isFavorite={true}
              orderDate={orderDate}
            />
          </Grid>
        );
      }
    }
    return null
  });
  return (
    <Grid container spacing={2} rowSpacing={2}>
      {recentOrdersItem.length > 0 ? recentOrdersItem : "No orders found"}
    </Grid>
  );
};
