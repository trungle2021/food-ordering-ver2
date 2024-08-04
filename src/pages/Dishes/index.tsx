import { Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import { DishCard } from '~/components/specific/Dish/DishCard';
import { HeaderPage } from '~/components/specific/HeaderPage';
import { useQuery } from '~/hooks/useQuery';
import { useResponsiveLimitItem } from '~/hooks/useResponsiveLimitItem';
import BaseDishProps from '~/interface/dish/baseDish';
import DishService from '~/services/dish/dishService';



export const DishPage = () => {
    const [dishes, setDishes] = useState([]);
    const queryParams = useQuery()
    const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()
    const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 10 : isLg ? 8 : isXl ? 10 : 2
    useEffect(() => {
        async function getDishes() {
            console.log(queryParams.toString())
            const response = await DishService.getDishes(queryParams.toString(), dishLimit);
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
                    <Grid item key={dish._id} xs={12} sm={6} md={3} lg={3}>
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
