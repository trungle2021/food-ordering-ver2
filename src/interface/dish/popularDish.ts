import BaseDish from "./baseDish";

export default interface PopularDishProps extends BaseDish {
    itemSold: number | 0;
    ratingPoint?: number | 0;
}
