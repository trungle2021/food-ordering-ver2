import React from "react";
import Card from "../../UI/Card/Card";
import Star from "../../UI/Star/Star";
import Heart from "../../UI/Heart/Heart";
import Discount from "../../UI/Discount/Discount";
import styles from "./PopularDish.module.css";
import { Rating } from "../../Rating/Rating";

export const PopularDish = ({
  imageLink,
  discount,
  isFavorite,
  ratingPoint,
}) => {
  return (
    <Card>
      <div className={`${styles["popular-dish-container"]}`}>
        <div className={`${styles["popular-dish-container__header"]}`}>
          <Discount
            className={`${styles["popular-dish-container--discount"]}`}
            amount={discount}
          />
          <Heart isFavorite={isFavorite} />
        </div>
        <img
          className={`${styles["popular-dish-container__image"]}`}
          src={imageLink}
          alt=""
        />
        <Rating ratingPoint={ratingPoint} size={30} />
        <div className={`${styles["popular-dish-container__body"]}`}>
          <div className={`${styles["popular-dish-container__info"]}`}>
            <span
              className={`${styles["popular-dish-container__info--food-name"]}`}
            >
              Food Name
            </span>
            <span
              className={`${styles["popular-dish-container__info--price"]}`}
            >
              <span className="dollar">$</span>
              4.45
            </span>
          </div>
          <button
            className={`${styles["popular-dish-container--add-to-cart-btn"]}`}
          >
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
