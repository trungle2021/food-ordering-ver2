export default interface IDish {
  imageLink: string;
  itemSold?: number | undefined;
  discount?: number | undefined;
  name: string;
  price: number;
  isFavorite?: boolean | undefined;
  ratingPoint?: number | undefined;
}
