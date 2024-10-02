import { useEffect, useState } from 'react';
import OrderDetail from '~/interface/order/orderDetailResponse';
import Order from '~/interface/order/orderResponse';
import OrderService from '~/services/order/orderSerivce';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { DishCard } from '../../Dish/DishCard';

export const RecentOrderList = ({ limit }: { limit: number }) => {
  const userId = useSelector((state: any) => state.user?.user?._id);
  const [recentOrderDishes, setRecentOrderDishes] = useState([]);

  const getRecentOrders = async (userId: string, limit: number) => {
    try {
      const response = await OrderService.getRecentOrderList(userId, limit);
      console.log('response', response);
      setRecentOrderDishes(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (userId) getRecentOrders(userId, limit);
  }, [userId]);

  const recentOrdersItem = recentOrderDishes.map((order: Order) => {
    let orderDetailsList = order.order_details;
    if (orderDetailsList.length > 0) {
      const sortedOrderDetailsList = [...orderDetailsList].sort((a: OrderDetail, b: OrderDetail) => b.dish.price - a.dish.price);
      const dish = sortedOrderDetailsList[0].dish;
      const favoriteInfo = sortedOrderDetailsList[0].favoriteInfo;
      return (
        <Grid key={order._id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DishCard
              _id={dish._id}
              image={dish.image}
              discount={dish.discount}
              name={dish.name}
              price={dish.price}
              favoriteInfo={favoriteInfo}
              ratingPoint={4}
            />
          </Grid>
        );
    }
    return null;
  });



  return (
    <Grid container spacing={2} rowSpacing={2}>
      {recentOrderDishes.length > 0 ? recentOrdersItem : 'No orders found'}
    </Grid>
  );
};
