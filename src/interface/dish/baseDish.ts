import FavoriteInfo from "../favorite/favorite";

export default interface BaseDishProps {
    _id: string;
    discount: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    favorite_info?: FavoriteInfo;
}
