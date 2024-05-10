import { RecentOrder } from '~/interface/order/recentOrder';

export interface OrderResponse {
  _id: string;
  order_detail: {
    dish: RecentOrder;
  };
}
