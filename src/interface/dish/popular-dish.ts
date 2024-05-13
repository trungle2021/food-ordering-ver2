import BaseDish from "./base-dish";

export default interface PopularDish extends BaseDish {
    itemSold: number | 0;
    isFavorite?: boolean | false;
    ratingPoint?: number | 0;
}
