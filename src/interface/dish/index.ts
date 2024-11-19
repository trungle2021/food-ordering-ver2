export interface DishQueryParams {
    categories?: string[];
    sort?: string[];
    priceRange: {
        min: number;
        max: number;
    } | undefined ;
    page?: number;
    limit?: number;
}


export interface BaseDishProps {
    _id: string;
    discount: number;
    name: string;
    price: number;
    itemSold?: number | 0;
    rating: {
        averageRating: number | 0;
        totalRating: number | 0;
    };
    description: string;
    image: string;
    category: string;
    isFavorite?: boolean;
}


export interface RecentOrderProps extends BaseDishProps {
    orderDate: string;
}
