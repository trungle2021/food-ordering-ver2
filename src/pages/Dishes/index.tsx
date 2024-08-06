import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, Grid, Slider } from '@mui/material'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryService from '~/services/category/categoryService';




export const DishPage = () => {
    useClearSearchData()
    const [open, setOpen] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([])
    const [valuePriceRange, setValuePriceRange] = useState<number[]>([20, 37]);

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

    const toggleFilterAction = (newOpen: boolean) => async () => {
        if (newOpen && categories.length == 0) {
            const response = await CategoryService.getCategoryList()
            if (response.data && response.data.length > 0) {
                setCategories(response.data)
            }
        }
        setOpen(newOpen)
    }

    const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
        setValuePriceRange(newValue as number[]);
    };

    return (
        <div style={{ padding: '50px' }}>

            <HeaderPage pageName="Dishes" />
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <div>
                    <SearchDish />
                </div>
                <div>
                    <Drawer anchor='right' open={open} onClose={toggleFilterAction(false)}>
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                            <h1>Filter & Sort</h1>
                        </div>
                        <Divider />
                        <Box sx={{ width: 250 }} role="presentation">
                            <Accordion disableGutters defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <h2>Category</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {categories.length > 0 && categories.map((category: any) =>
                                            <FormControlLabel sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.5rem',
                                                },
                                            }} key={category._id} control={<Checkbox />} label={category.name} />
                                        )}
                                    </FormGroup>

                                </AccordionDetails>
                            </Accordion>

                            <Accordion disableGutters>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <h2>Sort By</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="Vertical button group"
                                            variant="contained"
                                            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                                        >
                                            <Button>Price (lowest - highest)</Button>
                                            <Button>Newest</Button>
                                            <Button>Best Seller</Button>
                                            <Button>Price (highest - lowest)</Button>
                                        </ButtonGroup>
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                            <Box sx={{padding: '16px'}}>
                                <h2>Price</h2>
                                <Slider
                                sx={{padding: '46px 0'}}
                                    getAriaLabel={() => 'Temperature range'}
                                    value={valuePriceRange}
                                    onChange={handlePriceRangeChange}
                                    valueLabelDisplay="on"
                                />
                            </Box>

                        </Box>
                    </Drawer>
                    <button onClick={toggleFilterAction(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>Filter & Sort <TuneIcon /> </button>
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
