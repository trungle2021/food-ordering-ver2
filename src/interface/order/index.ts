import { BaseDishProps } from "../dish";

export interface OrderDetailProps {
    created_at: string;
    _id: string;
    order: OrderProps;
    dish: BaseDishProps;
    quantity: number;
    amount: number;
    isFavorite: boolean;
}

export interface OrderProps {
    _id: string;
    user: string;
    order_date: string;
    created_at: string;
    time_completed: string | null;
    order_status: string;
    order_details: OrderDetailProps[];
    payment_status: string;
    payment_method: string | null;
    order_total: number;
    shipping_address: string;
}

