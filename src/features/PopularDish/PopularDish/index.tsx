import Heart from "~/components/UI/Heart";
import Discount from "~/components/UI/Discount";
import styles from "./styles.module.css";
import { Rating } from "~/components/UI/Rating";
import { Card } from "@mui/material";
import PopularDishProps from "~/interface/dish/popularDish";
import { useAddToCart } from "~/hooks/useAddToCart";

export const PopularDish = ({
  _id,
  image,
  itemSold,
  discount,
  name,
  price,
  isFavorite,
  ratingPoint,
}: PopularDishProps) => {
    const handleAddButton = useAddToCart();
   
  return (
    <Card>
      <div className={`${styles["dish-container"]}`}>
        <div className={`${styles["dish-container__header"]}`}>
          {discount > 0 && <Discount
            className={`${styles["dish-container--discount"]}`}
            amount={discount}
          />
          }
        </div>
        <img
          className={`${styles["dish-container__image"]}`}
          src={image}
          alt=""
        />
        <div className="d-flex justify-between align-center">
          <Rating ratingPoint={ratingPoint} size={20} />
          <span>{itemSold} Sold</span>
        </div>
        <div className={`${styles["dish-container__body"]}`}>
          <div className={`${styles["dish-container__info"]}`}>
            <span className={`${styles["dish-container__info--food-name"]}`}>
              {name}
            </span>
            <div className={`${styles["dish-container__info--price"]}`}>
              <span >
                <span className="dollar">$</span>{price}
              </span>
              <Heart
                isFavorite={isFavorite || false} // Ensure isFavorite is of type boolean
              />
            </div>
          </div>
          <button className={`${styles["dish-container__addToCartBtn"]}`} onClick={() => handleAddButton(_id)}>
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
