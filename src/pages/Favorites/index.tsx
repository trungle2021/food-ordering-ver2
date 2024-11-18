
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DishCard } from "~/components/specific/Dish/DishCard";
import { HeaderPage } from "~/components/specific/HeaderPage";
import {FavoriteService} from "~/services/favorite/favoriteService";
import BaseDishProps from "~/interface/dish/baseDish";

export const Favorites = () => {
  const [favoriteDishes, setFavoriteDishes] = useState<BaseDishProps[]>([]);
  const userId = useSelector((state: any) => state.user?.user?._id);
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveFavorite = (dishId: string) => {
    setFavoriteDishes(prevDishes => prevDishes.filter(dish => dish._id !== dishId));
  };

  useEffect(() => {
    const fetchFavoriteDishes = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const response = await FavoriteService.getFavoriteDishes(userId);
          setFavoriteDishes(response.data);
        } catch (error) {
          console.error("Error fetching favorite dishes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavoriteDishes();
  }, [userId]);

  return (
    <>
      <div className={`${styles["searchbar-container"]}`}>
        <div style={{ padding: "50px" }}>
          <HeaderPage pageName="Favorites" />
          <div style={{ marginTop: "50px" }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : favoriteDishes.length === 0 ? (
              <div>No favorite dishes found</div>
            ) : (
              <Grid container spacing={5}>
                {favoriteDishes.map((dish: BaseDishProps) => (
                  console.log("dish", dish),
                  <Grid item key={dish._id} xs={12} sm={6} md={3} lg={3}>
                    <DishCard
                      _id={dish._id}
                      image={dish.image}
                      itemSold={0}
                      averageRating={dish.rating.averageRating}
                      discount={0}
                      name={dish.name}
                      price={dish.price}
                      isFavorite={dish.isFavorite}
                      onRemove={() => handleRemoveFavorite(dish._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
