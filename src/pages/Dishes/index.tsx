import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, Grid, Slider } from '@mui/material'
import { Box } from '@mui/system';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryService from '~/services/category/categoryService';
import { CategoryCheckBox } from '~/components/specific/Category/CategoryCheckBox';
import CategoryProps from '~/interface/category/category';
import { useHistory } from 'react-router-dom';


interface CheckedCategoriesProps {
    [key: string]: boolean
}


export const DishPage = () => {
    useClearSearchData()

    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [valuePriceRange, setValuePriceRange] = useState<number[]>([0, 100]);
    const [checkedCategories, setCheckedCategories] = useState<CheckedCategoriesProps>({})

    const searchDishes = useSelector((state: any) => state.searchDish)
    const searchDishesData = searchDishes.data
    const queryParams = useQuery()
    const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()

    const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 10 : isLg ? 8 : isXl ? 10 : 2

    useEffect(() => {
        setDefautlCheckedCategories()
    })

    const getDishes = async () => {
        const response = await DishService.getDishes(queryParams.toString(), dishLimit);
        setDishes(response.data);
    };

    const setDefautlCheckedCategories = () => {
        if (queryParams.has('category_name')) {
            const categoryNames = queryParams.get('category_name')?.split(',')
            if (categories.length > 0 && categoryNames) {
                categories.forEach((category: CategoryProps) => {
                    let categoryId = category._id
                    let categoryName = category.name
                    if (categoryNames?.includes(categoryName)) {
                        checkedCategories[categoryId] = true
                    } else {
                        checkedCategories[categoryId] = false
                    }
                })
                setCheckedCategories(checkedCategories)
            }
        }
    }

   

    useEffect(() => {
        getDishes();

    }, [queryParams, dishLimit]);

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

    const handleCategoryCheckBoxChange = (dataChanged: CheckedCategoriesProps, categoryIdChanged: string) => {
        const isChecked = dataChanged[categoryIdChanged];
        const category = categories.find((category) => category._id === categoryIdChanged)
        const existingCategoriesQueryParam = queryParams.get('category_name');

        if (existingCategoriesQueryParam) {
            let categoryNames = existingCategoriesQueryParam.split(',')
            if (isChecked) {
                categoryNames.push(category?.name as string)
                queryParams.set('category_name', categoryNames.join(','))
            } else {
                categoryNames = categoryNames.filter((categoryName) => categoryName !== category?.name)
                if (categoryNames.length === 0) {
                    queryParams.delete('category_name')
                } else {
                    queryParams.set('category_name', categoryNames.join(','))
                }
            }
        } else {
            queryParams.set('category_name', category?.name as string)
        }
        history.push({ search: queryParams.toString() });
        setCheckedCategories(dataChanged);
    }

    const handleClickSortBy = (sortBy: String) => () => {
        if (sortBy) {
            if (sortBy === 'price_asc') {
                queryParams.set('sort_by', 'price_desc')
            } else if (sortBy === 'price_desc') {
                queryParams.set('sort_by', 'price_asc')
            } else {
                queryParams.delete('sort_by')
            }
        } else {
            queryParams.set('sort_by', 'price_asc')
        }
        history.push({ search: queryParams.toString() });
    }


    return (
        <div style={{ padding: '50px' }}>
            <HeaderPage pageName="Dishes" />
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <SearchDish />
                <Drawer anchor='right' open={open} onClose={toggleFilterAction(false)}>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <h1>Filter & Sort</h1>
                    </div>
                    <Divider />
                    <Box sx={{ width: 350 }} role="presentation">
                        <Accordion disableGutters defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="category-content"
                                id="category-header">
                                <h2>Category</h2>
                            </AccordionSummary>
                            <AccordionDetails id='category-content'>
                                {categories.length > 0 && checkedCategories && <CategoryCheckBox categories={categories} checkedCategories={checkedCategories} onChange={handleCategoryCheckBoxChange} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion disableGutters>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="sortBy-content"
                                id="sortBy-header">
                                <h2>Sort By</h2>
                            </AccordionSummary>
                            <AccordionDetails id='sortBy-content'>
                                <FormGroup>
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="Vertical button group"
                                        variant="contained"
                                        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                                    >
                                        <Button onClick={handleClickSortBy('price_asc')}>Price (lowest - highest)</Button>
                                        <Button onClick={handleClickSortBy('created_at')}>Newest</Button>
                                        <Button onClick={handleClickSortBy('order_count')}>Best Seller</Button>
                                        <Button onClick={handleClickSortBy('price_desc')}>Price (highest - lowest)</Button>
                                    </ButtonGroup>
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="price-content"
                                id="price-header">
                                <h2>Price</h2>
                            </AccordionSummary>
                            <AccordionDetails id='price-content'>
                                <Slider
                                    sx={{ padding: '46px 0' }}
                                    min={0}
                                    max={100}
                                    step={10}
                                    value={valuePriceRange}
                                    onChange={handlePriceRangeChange}
                                    valueLabelDisplay="on"
                                />
                            </AccordionDetails>
                        </Accordion>


                    </Box>
                </Drawer>
                <button onClick={toggleFilterAction(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>Filter & Sort <TuneIcon /> </button>
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
