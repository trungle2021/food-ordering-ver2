import BaseDish from "./baseDish";

export default interface PopularDish extends BaseDish {
    itemSold: number | 0;
    discount: number | 0;
    isFavorite?: boolean | false;
    ratingPoint?: number | 0;
}
