import Card from "../UI/Card/Card";
import Heart from "../UI/Heart/Heart";
import Discount from "../UI/Discount/Discount";
import styles from "./Dish.module.css";
import { Rating } from "../UI/Rating/Rating";
import IDish from "../../interface/dish/dish";

export const Dish = ({
  imageLink,
  itemSold,
  discount,
  name,
  price,
  isFavorite,
  ratingPoint,
}: IDish) => {
  return (
    <Card>
      <div className={`${styles["dish-container"]}`}>
        <div className={`${styles["dish-container__header"]}`}>
          <Discount
            className={`${styles["dish-container--discount"]}`}
            amount={discount}
          />
          <Heart isFavorite={isFavorite} />
        </div>
        <img
          className={`${styles["dish-container__image"]}`}
          src={imageLink}
          alt=""
        />
        <div className="d-flex justify-between align-center">
          <Rating ratingPoint={ratingPoint} size={30} />
          <span>{itemSold} Sold</span>
        </div>
        <div className={`${styles["dish-container__body"]}`}>
          <div className={`${styles["dish-container__info"]}`}>
            <span className={`${styles["dish-container__info--food-name"]}`}>
              {name}
            </span>
            <span className={`${styles["dish-container__info--price"]}`}>
              <span className="dollar">$</span>
              {price}
            </span>
          </div>
          <button className={`${styles["dish-container--add-to-cart-btn"]}`}>
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
