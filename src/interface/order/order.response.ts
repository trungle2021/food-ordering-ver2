import OrderDetail from "./order-detail.response";

export default interface Order {
    _id: string;
    user: string;
    order_date: string;
    created_at: string;
    time_completed: string | null;
    order_status: string;
    order_details: OrderDetail[];
    payment_status: string;
    payment_method: string | null;
    order_total: number;
    shipping_address: string;
}