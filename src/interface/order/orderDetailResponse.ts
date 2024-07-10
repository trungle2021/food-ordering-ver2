import BaseDish from "../dish/baseDish";
import Order from "./orderResponse";

export default interface OrderDetailProps {
    created_at: string;
    _id: string;
    order: Order;
    dish: BaseDish;
    quantity: number;
    price: number;
}