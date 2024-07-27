import { Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import { DishCard } from '~/components/specific/Dish/DishCard';
import { HeaderPage } from '~/components/specific/HeaderPage';
import BaseDishProps from '~/interface/dish/baseDish';
import DishService from '~/services/dish/dishService';



export const DishPage = () => {
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        async function getDishes() {
            const limit = 10
            const response = await DishService.getDishes(limit);
            setDishes(response.data);
        }
        getDishes();
    }, []);
    return (
       <>
        <HeaderPage pageName="Dishes" />
        <div style={{padding: '50px'}}>
            <Grid container spacing={5}>
                {dishes.map((dish: BaseDishProps) => (
                    <Grid item key={dish._id} xs={12} sm={6} md={3}>
                        <DishCard
                            _id={dish._id}
                            image={dish.image}
                            itemSold={0}
                            isActive={false}
                            discount={0}
                            name={dish.name}
                            price={dish.price}
                            description={dish.description}
                            category={dish.category}
                            />
                    </Grid>
                ))}
            </Grid>
        </div>
       </>
    )
}