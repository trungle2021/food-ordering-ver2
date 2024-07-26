import { useEffect, useState } from "react";
import DishService from "../../../services/dish/dishService";
import { Grid } from "@mui/material";
import { Dish } from "~/components/Dish";


export const PopularDishList = ({ limit }: { limit: number }) => {
    const [popularDishes, setPopularDishes] = useState([]);

    const getPopularDishes = async () => {
        try {
            const response = await DishService.getPopularDishes(limit);
            setPopularDishes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPopularDishes();
    }, []);

    const popularDishList = popularDishes.map((item: any) => {

        const { _id, image, discount, name, price, isFavorite } = item.dish;

        const itemSold = item.count;

        return (
            <Grid key={_id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Dish
                    _id={_id}
                    image={image}
                    itemSold={itemSold}
                    discount={discount}
                    name={name}
                    price={price}
                    isFavorite={isFavorite}
                    isActive={false}
                    description={""}
                    category={""}
                />
            </Grid>
        );
    });
    return (
        <Grid container spacing={2} rowSpacing={2}>
            {popularDishList}
        </Grid>
    );
};
