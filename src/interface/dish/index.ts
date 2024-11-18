export type SortField = 'itemSold' | 'created_at' | 'price' | 'rating';
export type SortOrder = 'asc' | 'desc';

export interface DishQueryParams {
    category?: string | string[];
    page?: number;
    limit?: number;
    sort?: {
      field: SortField;
      order: SortOrder;
    };
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
  