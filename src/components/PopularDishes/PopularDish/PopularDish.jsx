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
          <Discount amount={discount} />
          <Heart isFavorite={isFavorite} />
        </div>
        <img
          className={`${styles["popular-dish-container__image"]}`}
          src={imageLink}
          alt=""
        />
        {/* star rating */}
        <Rating ratingPoint={ratingPoint} size={30} />
        {/* dish info section */}
        <div>
          <span></span>
        </div>
      </div>
    </Card>
  );
};
