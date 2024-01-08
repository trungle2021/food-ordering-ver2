import React from "react";
import Card from "../../UI/Card/Card";
import Star from "../../UI/Star/Star";
import Heart from "../../UI/Heart/Heart";
import Discount from "../../UI/Discount/Discount";
import styles from './PopularDish.module.css'

export const PopularDish = ({imageLink, discount, isFavorite}) => {
  return (
    <li>
        <Card className>
            <div className={`${styles['discount-favorite__container']}`}>
              <Discount amount={discount}/>
              <Heart isFavorite={isFavorite}/>
            </div>
            <img src={imageLink} alt="" />
        </Card>
    </li>
  )
}
