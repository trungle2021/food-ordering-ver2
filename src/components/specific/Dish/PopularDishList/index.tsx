import { useEffect, useState } from "react";
import DishService from "../../../../services/dish/dishService";
import { Grid } from "@mui/material";
import { DishCard } from "~/components/specific/Dish/DishCard";


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

        const { _id, image, discount, name, price } = item.dish
        const favoriteInfo = item.favorite_info

        const itemSold = item.totalQuantity;

        return (
            <Grid key={_id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                <DishCard
                    _id={_id}
                    image={image}
                    itemSold={itemSold}
                    discount={discount}
                    name={name}
                    price={price}
                    favorite_info={favoriteInfo}
                    ratingPoint={4}
                    // isActive={false}
                    // description={""}
                    // category={""}
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
