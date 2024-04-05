import Card from "../../../components/UI/Card";
import Heart from "../../../components/UI/Heart";
import Discount from "../../../components/UI/Discount";
import styles from "./styles.module.css";
import { Rating } from "../../../components/UI/Rating";
import DishResponse from "../../../interface/dish/dish";

export const Dish = ({
  image,
  itemSold,
  discount,
  name,
  price,
  isFavorite,
  ratingPoint,
}: DishResponse) => {
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
          src={image}
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
