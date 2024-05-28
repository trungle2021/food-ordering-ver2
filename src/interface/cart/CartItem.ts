import BaseDishProps from "../dish/base-dish";

export default interface CartItemProps {
  _id: string;
  amount:number;
  dish: BaseDishProps;
  quantity: number;
  }