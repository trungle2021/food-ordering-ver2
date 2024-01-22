import React from "react";
import Card from "../../UI/Card/Card";
import styles from './RecentOrder.module.css'
import Heart from "../../UI/Heart/Heart";
const RecentOrder = ({
  image,
  imageSize,
  name,
  price,
  isFavorite,
}) => {
  return (
   <Card>
      <div className={`${styles['recent-order-container']}`}>
          <div className={`${styles['recent-order-container__header']}`}>
            <Heart isFavorite={isFavorite}/>
          </div>
          <div className={`${styles['recent-order-container__body']}`}>
            <img src={image}/>
            <span className={`${styles['recent-order__name']}`}>{name}</span>
            <span className={`${styles['recent-order__price']}`}>{price}</span>
          </div>
     
      </div>
   </Card>
  );
};

export default RecentOrder;
