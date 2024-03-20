export default interface Dish {
  imageLink: string;
  itemSold?: number | undefined;
  discount?: number | undefined;
  name: string;
  price: number;
  isFavorite?: boolean | undefined;
  ratingPoint?: number | undefined;
}
