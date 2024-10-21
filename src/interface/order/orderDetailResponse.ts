import BaseDish from "../dish/baseDish";
import FavoriteInfo from "../favorite/favorite";
import Order from "./orderResponse";

export default interface OrderDetailProps {
    created_at: string;
    _id: string;
    order: Order;
    dish: BaseDish;
    quantity: number;
    amount: number;
    favoriteInfo: FavoriteInfo;
}