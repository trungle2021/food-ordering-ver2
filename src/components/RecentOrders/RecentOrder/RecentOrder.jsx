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
          <img src={image}/>
          <div className={`${styles['recent-order-container__body']}`}>
            <div className={`${styles['recent-order-container__info']}`}>
                <span className={`${styles['recent-order-container__info--name']}`}>{name}</span>
                <span className={`${styles['recent-order-container__info--price']}`}><span className="dollar">$</span>{price}</span>
            </div>
          </div>
     
      </div>
   </Card>
  );
};

export default RecentOrder;
