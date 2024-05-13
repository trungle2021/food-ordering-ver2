import BaseDish from "../dish/base-dish";
import Order from "./order.response";

export default interface OrderDetail {
    created_at: string;
    _id: string;
    order: Order;
    dish: BaseDish;
    quantity: number;
    price: number;
}