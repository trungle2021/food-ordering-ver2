import { useEffect, useState } from "react";
import RecentOrder from "../RecentOrder";
import BaseDish from "~/interface/dish/baseDish";
import OrderDetail from "~/interface/order/orderDetailResponse";
import Order from "~/interface/order/orderResponse";
import OrderService from "~/services/order/orderSerivce";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

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
    const userId = useSelector((state: any) => state.user?.user?._id);
    const limit = 4
    const getRecentOrders = async () => {
        try {
            const response = await OrderService.fetchRecentOrderList(userId, limit);
            setRecentOrders(response.data);
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
