import { BaseDishProps } from "../dish";

export interface CartItemProps {
  _id: string;
  amount: number;
  dish: BaseDishProps;
  quantity: number;
}

export interface CartState {
  items: CartItemProps[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  cartHasBeenUpdated: boolean;
}
