
export default interface BaseDishProps {
    _id: string;
    discount: number;
    name: string;
    price: number;
    itemSold: number | 0;
    ratingPoint?: number | 0;
    description: string;
    image: string;
    category: string;
    isFavorite?: boolean;
}
