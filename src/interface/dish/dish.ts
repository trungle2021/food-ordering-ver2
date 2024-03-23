export default interface DishResponse {
  _id?: string;
  image: string;
  itemSold?: number | undefined;
  discount?: number | undefined;
  name: string;
  price: number;
  isFavorite?: boolean | undefined;
  ratingPoint?: number | undefined;
}
