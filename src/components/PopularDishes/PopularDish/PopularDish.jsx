import React from "react";
import Card from "../../UI/Card/Card";
import Star from "../../UI/Star/Star";
import Heart from "../../UI/Heart/Heart";
import Discount from "../../UI/Discount/Discount";
import styles from './PopularDish.module.css'

export const PopularDish = ({ imageLink, discount, isFavorite }) => {
  return (
    <li>
      <Card className={`${styles['populardish-container']}`}>
        <div className={`${styles['populardish-container__header']}`}>
          <Discount amount={discount} />
          <Heart isFavorite={isFavorite} />
        </div>
        <img className={`${styles['populardish-container__image']}`} src={imageLink} alt="" />
        {/* star rating */}
        <Rating />
        {/* dish info section */}

      </Card>
    </li>
  )
}
