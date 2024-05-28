import Heart from "~/components/UI/Heart";
import Discount from "~/components/UI/Discount";
import styles from "./styles.module.css";
import { Rating } from "~/components/UI/Rating";
import { Card } from "@mui/material";
import PopularDishProps from "~/interface/dish/popular-dish";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "~/features/Cart/cartAction";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useState } from "react";

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
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()

    const handleAddButton = (dishId: string) => {
    const payload = {
        dishId,
        quantity: 1,
    }
    dispatch<any>(addItem(payload))
    .then(unwrapResult)
    .then((payload:any) => {
        toast.success('Item has been added to the cart.')
    })
    .catch((err:any) => {
        toast.error(err.message)
    });
    }
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
