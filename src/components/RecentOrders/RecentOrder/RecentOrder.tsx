import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./RecentOrder.module.css";
import Heart from "../../UI/Heart/Heart";

interface RecentOrderProps {
  image: string;
  name: string;
  price: number;
  isFavorite: boolean;
}

const RecentOrder = (props: RecentOrderProps) => {
  return (
    <Card>
      <div className={`${styles["recent-order-container"]}`}>
        <div className={`${styles["recent-order-container__header"]}`}>
          <Heart isFavorite={props.isFavorite} />
        </div>
        <img src={props.image} />
        <div className={`${styles["recent-order-container__body"]}`}>
          <div className={`${styles["recent-order-container__info"]}`}>
            <span className={`${styles["recent-order-container__info--name"]}`}>
              {props.name}
            </span>
            <span
              className={`${styles["recent-order-container__info--price"]}`}
            >
              <span className="dollar">$</span>
              {props.price}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentOrder;
