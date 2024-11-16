import styles from "./styles.module.css";
import { Card } from "@mui/material";
import Heart from "~/components/common/UI/Heart";
import Discount from "~/components/common/UI/Discount";
import Rating from "~/components/common/UI/Rating";
import { useSelector } from "react-redux";
import FavoriteInfo from "~/interface/favorite/favorite";
import { useFavoriteDish } from "~/hooks/useFavoriteDish";
import { useCart } from "~/hooks/useCart";
import { useState } from "react";

interface DishCardProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
    ratingPoint: number;
    itemSold?: number;
    isFavorite?: boolean;
    onRemove?: (dishId: string) => void;
}

export const DishCard = (props: DishCardProps) => {
    const { _id: dishId, name, image, price, discount, ratingPoint, itemSold, isFavorite, onRemove } = props;
    const userId = useSelector((state: any) => state.user?.user?._id)
    const { addItemToCart } = useCart();
    const { toggleFavorite } = useFavoriteDish({dishId, userId, onRemove }); 

    const handleToggleFavorite = async (newState: boolean) => {
        await toggleFavorite(newState);
    };


    return (
        <Card>
            <div className={`${styles["dish-container"]}`}>
                <div className={`${styles["dish-container__header"]}`}>
                    {discount && discount > 0 && <Discount
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
                <div className={`${styles["dish-container__rating"]}`}>
                    <Rating ratingPoint={ratingPoint} size={20} />
                    {itemSold != undefined && itemSold > 0 && <span>{itemSold} Sold</span>}
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
                            {userId && <Heart isFavorite={!!isFavorite || false} onClick={handleToggleFavorite} />}
                        </div>
                    </div>
                    <button type="button" className={`${styles["dish-container__addToCartBtn"]}`} onClick={() => addItemToCart(dishId)}>
                        +
                    </button>
                </div>
            </div>
        </Card>
    );
};
