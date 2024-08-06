import { Grid} from '@mui/material'
import { Box, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DishCard } from '~/components/specific/Dish/DishCard';
import { HeaderPage } from '~/components/specific/HeaderPage';
import { SearchDish } from '~/components/specific/SearchDish';
import useClearSearchData from '~/hooks/useClearSearchData';
import { useQuery } from '~/hooks/useQuery';
import { useResponsiveLimitItem } from '~/hooks/useResponsiveLimitItem';
import BaseDishProps from '~/interface/dish/baseDish';
import DishService from '~/services/dish/dishService';
import TuneIcon from '@mui/icons-material/Tune';
import styles from './styles.module.css'




export const DishPage = () => {
    useClearSearchData()
    const [dishes, setDishes] = useState([]);
    const searchDishes = useSelector((state: any) => state.searchDish)
    const searchDishesData = searchDishes.data
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

    const handleDisplayFilterAction = () => {
        console.log('Filter & Sort')
    }
  
  
    return (
        <div style={{ padding: '50px' }}>
            <div className={styles['filter-sort-container']}>

            </div>
            <HeaderPage pageName="Dishes" />
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <div>
                    <SearchDish />
                </div>
                <div>
                   <button onClick={handleDisplayFilterAction} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>Filter & Sort <TuneIcon /> </button>
                </div>
            </div>

            <div style={{ marginTop: '50px' }}>
                <Grid container spacing={5}>

                    {searchDishesData ? searchDishesData.map((dish: BaseDishProps) => (
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
                    )) :
                        dishes.map((dish: BaseDishProps) => (
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
        </div>
    )
}
