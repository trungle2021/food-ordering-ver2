import styles from "./styles.module.css";
import { Card } from "@mui/material";
import { useAddItemToCart } from "~/hooks/useAddItemToCart";
import Heart from "~/components/common/UI/Heart";
import Discount from "~/components/common/UI/Discount";
import Rating from "~/components/common/UI/Rating";
import { useState } from "react";
import { FavoriteService } from '../../../../services/favorite/favoriteService';
import { useSelector } from "react-redux";
import FavoriteInfo from "~/interface/favorite/favorite";

interface DishCardProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    discount: number;
    ratingPoint: number;
    itemSold: number;
    favorite_info: FavoriteInfo;
}

export const DishCard = (props: DishCardProps) => {
    const { _id: dishId, name, image, price, discount, ratingPoint, itemSold, favorite_info } = props;
    const userId = useSelector((state: any) => state.user?.user?._id)
    const [favoriteId, setFavoriteId] = useState(favorite_info?._id || '');
    const [isFavorite, setIsFavorite] = useState(favorite_info ? true : false);
    const handleAddButton = useAddItemToCart();

    const handleFavoriteClick = async () => {
        if (dishId && userId) {
            if (isFavorite) {
              // Remove favorite
              await FavoriteService.deleteFavoriteDish(favoriteId);
              setIsFavorite(false);
              setFavoriteId('');
            } else {
              // Add favorite
              const response = await FavoriteService.createFavoriteDish({
                dishId,
                userId
              });
              setIsFavorite(true);
              setFavoriteId(response._id);
            }
          }
    };

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
                            {userId && <Heart isFavorite={isFavorite} onFavoriteClick={handleFavoriteClick} />}
                        </div>
                    </div>
                    <button type="button" className={`${styles["dish-container__addToCartBtn"]}`} onClick={() => handleAddButton(dishId)}>
                        +
                    </button>
                </div>
            </div>
        </Card>
    );
};
