import FavoriteInfo from "../favorite/favorite";

export default interface BaseDishProps {
    _id: string;
    isActive: boolean;
    discount: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    favoriteInfo?: FavoriteInfo;
}
