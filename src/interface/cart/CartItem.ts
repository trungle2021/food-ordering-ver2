import BaseDishProps from "../dish/baseDish";

export default interface CartItemProps {
  _id: string;
  amount:number;
  dish: BaseDishProps;
  quantity: number;
  }