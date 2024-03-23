import DishResponse from "../dish/dish";

export interface OrderResponse {
  _id: string;
  order_detail: {
    dish: DishResponse;
  };
}
