import DishResponse from "src/dish/dish";

export interface OrderResponse {
  _id: string;
  order_detail: {
    dish: DishResponse;
  };
}
