import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Divider, Drawer, FormGroup, Grid, Slider } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

import { DishCard } from '~/components/specific/Dish/DishCard';
import { HeaderPage } from '~/components/specific/HeaderPage';
import { SearchDish } from '~/components/specific/SearchDish';
import { CategoryCheckBox } from '~/components/specific/Category/CategoryCheckBox';
import useClearSearchData from '~/hooks/useClearSearchData';
import { useQuery } from '~/hooks/useQuery';
import { useResponsiveLimitItem } from '~/hooks/useResponsiveLimitItem';
import DishService from '~/services/dish/dishService';
import CategoryService from '~/services/category/categoryService';
import CategoryProps from '~/interface/category';
import { BaseDishProps } from '~/interface/dish';


interface CheckedCategoriesProps {
    [key: string]: boolean
}

interface ApplyingFilter {
    category_name?: string[];
    sort?: string[];
    price?: string[];
}


export const DishPage = () => {

    const history = useHistory()
    const searchDishes = useSelector((state: any) => state.searchDish)
    const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()
    const queryParams = useQuery()

    const [open, setOpen] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [applyingFilter, setApplyingFilter] = useState<ApplyingFilter>({})
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [valuePriceRange, setValuePriceRange] = useState<number[]>([0, 50]);
    const [checkedCategories, setCheckedCategories] = useState<CheckedCategoriesProps>({})
    
    const searchDishesData = searchDishes.data
    const categoryLimit = isXs ? 4 : isSm ? 6 : isMd ? 8 : isLg ? 10 : isXl ? 12 : 4
    const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 10 : isLg ? 8 : isXl ? 10 : 2

    useClearSearchData()

    // Effect 1: Handles data fetching
    useEffect(() => {
        getCategoryList();
    }, [categoryLimit]);

    // Effect 2: Handles state synchronization
    useEffect(() => {
        if (categories.length > 0) {
            setDefaultCheckedCategories();
        }
    }, [categories, queryParams]);

    useEffect(() => {
        getDishes();
        setDefaultFilter()
    }, [queryParams, dishLimit]);

    const setDefaultFilter = () => {
       
        if (queryParams.has('category_name')) {
            setDefaultCheckedCategories()
        }

        if (queryParams.has('sort')) {
            setDefaultSortBy()
        }

        if (queryParams.has('price[gte]') && queryParams.has('price[lte]')) {
            setDefaultPriceRange()
        }
    }

    const setDefaultCheckedCategories = () => {
        const categoryNames = queryParams.getAll('category_name')
        if (categories.length > 0 && categoryNames?.length > 0) {
            categories.forEach((category: CategoryProps) => {
                let categoryId = category._id
                let categoryName = category.name
                if (categoryNames.includes(categoryName)) {
                    checkedCategories[categoryId] = true
                } else {
                    checkedCategories[categoryId] = false
                }
            })
            setCheckedCategories(checkedCategories)
            updateApplyingFilter()
        }
    }

    const setDefaultSortBy = () => {
        const sortByParams = queryParams.getAll('sort')
        if (sortByParams.length > 0) {
            updateApplyingFilter()
        }
    }

    const setDefaultPriceRange = () => {
        const priceFrom = queryParams.get('price[gte]');
        const priceTo = queryParams.get('price[lte]');
        if (priceFrom && priceTo) {
            updateApplyingFilter()
        }
    }

    const getCategoryList = async () => {
        const response = await CategoryService.getCategoryList(categoryLimit)
        if (response.data && response.data.length > 0) {
            setCategories(response.data)
        }
    }

    const getDishes = async () => {
        const payload = {
            queryParams: queryParams.toString(),
            limit: dishLimit
        }
        const response = await DishService.getDishes(payload);
        setDishes(response.results);
    };

    const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
        setValuePriceRange(newValue as number[]);
    };

    const handlePriceRangeChangeCommited = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            queryParams.delete('price[gte]')
            queryParams.delete('price[lte]')
            queryParams.append('price[gte]', newValue[0].toString())
            queryParams.append('price[lte]', newValue[1].toString())
            history.push({ search: queryParams.toString() });
            updateApplyingFilter()

        }
    }

    const handleCategoryCheckBoxChange = (dataChanged: CheckedCategoriesProps, categoryIdChanged: string) => {
        const isChecked = dataChanged[categoryIdChanged];
        const category = categories.find((category) => category._id === categoryIdChanged);
        let cloneApplyingFilter: ApplyingFilter = { ...applyingFilter };

        if (isChecked) {
            queryParams.append('category_name', category?.name as string);
        } else {
            const updatedCategories = queryParams.getAll('category_name').filter((filter) => filter !== category?.name);
            queryParams.delete('category_name');

            if (updatedCategories.length === 0) {
                delete cloneApplyingFilter.category_name;
                setCheckedCategories({});
            } else {
                cloneApplyingFilter.category_name = updatedCategories;
            }

            updatedCategories.forEach((name) => queryParams.append('category_name', name));
        }
        setApplyingFilter(cloneApplyingFilter);

        history.push({ search: queryParams.toString() });
    };

    const handleClickSortBy = (filter: { sort: string }) => () => {
        const { sort } = filter;
        const sortByParams = queryParams.getAll('sort')
        let newSortByParams = new Set(sortByParams);

        if (sortByParams.includes('price-asc') && sort === 'price-desc') {
            newSortByParams.delete('price-asc')
        } else if (sortByParams.includes('price-desc') && sort === 'price-asc') {
            newSortByParams.delete('price-desc')
        }
        newSortByParams.add(sort);
        queryParams.delete('sort');
        Array(...newSortByParams).forEach((param) => queryParams.append('sort', param));
        updateApplyingFilter()
        history.push({ search: queryParams.toString() });
    };

    const handleClearFilter = (key: string, value: string) => (event: SyntheticEvent) => {
        const cloneApplyingFilter = { ...applyingFilter };

        switch (key) {
            case 'category_name':
                const updatedCategories = queryParams.getAll('category_name').filter((filter) => filter !== value);
                queryParams.delete('category_name');
                updatedCategories.forEach((category) => queryParams.append('category_name', category));
                if (updatedCategories.length === 0) {
                    delete cloneApplyingFilter.category_name;
                    setCheckedCategories({});
                } else {
                    cloneApplyingFilter.category_name = updatedCategories;
                }
                break;

            case 'sort':
                const updatedSortBy = queryParams.getAll('sort').filter((filter) => filter !== value);
                queryParams.delete('sort');
                updatedSortBy.forEach((sort) => queryParams.append('sort', sort));
                if (updatedSortBy.length === 0) {
                    delete cloneApplyingFilter.sort;
                } else {
                    cloneApplyingFilter.sort = updatedSortBy;
                }
                break;
            case 'price':
                queryParams.delete('price[gte]');
                queryParams.delete('price[lte]');
                delete cloneApplyingFilter.price;
                break;
            default:
                break;
        }
        setApplyingFilter(cloneApplyingFilter);
        history.push({ search: queryParams.toString() });
    };

    const handleResetFilter = () => {
        queryParams.delete('category_name');
        queryParams.delete('sort');
        queryParams.delete('price[gte]');
        queryParams.delete('price[lte]');
        setCheckedCategories({});
        setApplyingFilter({});
        setValuePriceRange([0, 100]);
        history.push({ search: queryParams.toString() });
    }
    
    const updateApplyingFilter = () => {
        const updatedCategoryNames = queryParams.getAll('category_name');
        const updatedSortByParams = queryParams.getAll('sort');
        const priceFrom = queryParams.get('price[gte]');
        const priceTo = queryParams.get('price[lte]');
        const updatedFilter: ApplyingFilter = {};

        if (updatedCategoryNames.length > 0) {
            updatedFilter.category_name = updatedCategoryNames
        }

        if (updatedSortByParams.length > 0) {
            updatedFilter.sort = updatedSortByParams
        }

        if (priceFrom && priceTo) {
            updatedFilter.price = [`Price: ${priceFrom}$ - ${priceTo}$`]
        }
        setApplyingFilter(updatedFilter);
    }

    const toggleFilterAction = (newOpen: boolean) => async () => {
        setOpen(newOpen)
    }


    return (
        <div style={{ padding: '50px' }}>
            <HeaderPage pageName="Dishes" />
            <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
                <SearchDish />
               
                <Drawer sx={{ width: '350px' }} anchor='right' open={open} onClose={toggleFilterAction(false)}>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <h1>Filter & Sort</h1>
                    </div>
                    <Divider />
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                        {(applyingFilter.category_name || applyingFilter.sort ||  applyingFilter.price) &&
                            (
                                <div style={{ padding: '10px 0' }}>
                                    <h2 style={{ paddingBottom: '10px' }}>Applying Filter </h2>
                                    <button style={{ position: 'absolute', top: '10px', right: '5px', backgroundColor: 'grey', color: 'var(--white)', padding: '0 10px', fontSize: '1.2rem' }} onClick={handleResetFilter}>Reset</button>
                                    <div style={{ display: 'flex', width: '350px', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        {
                                            Object.entries(applyingFilter).map(([key, value]: [string, string[]]) => {
                                                return value.map((filterName: string, index: number) => (
                                                    <button onClick={handleClearFilter(key, filterName)} key={`${key}-${index}`} style={{ position: 'relative', padding: '5px 30px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
                                                        <span
                                                            style={{ width: '15px', position: 'absolute', zIndex: '10', color: 'var(--black)', top: -5, right: 0, border: 'none', borderRadius: '100%', fontSize: '1.5rem' }}
                                                        >
                                                            x
                                                        </span>
                                                        {filterName}
                                                    </button>
                                                ));
                                            })
                                        }
                                    </div>
                                </div>
                            )}
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
                                        <Button onClick={handleClickSortBy({ sort: 'price-asc' })}>Price (lowest - highest)</Button>
                                        <Button onClick={handleClickSortBy({ sort: 'created_at-desc' })}>Newest</Button>
                                        <Button onClick={handleClickSortBy({ sort: 'price-desc' })}>Price (highest - lowest)</Button>
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
                                    max={50}
                                    step={5}
                                    value={valuePriceRange}
                                    onChange={handlePriceRangeChange}
                                    onChangeCommitted={handlePriceRangeChangeCommited}
                                    valueLabelDisplay="on"
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Drawer>
                <button onClick={toggleFilterAction(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>Filter & Sort <TuneIcon /> </button>
            </div>
            <div style={{display: 'flex'}}>
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                            {
                                (
                                    <div style={{ padding: '10px 0' }}>
                                        <div style={{ display: 'flex', width: '350px', gap: '10px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                            {
                                                Object.entries(applyingFilter).map(([key, value]: [string, string[]]) => {
                                                    return value.map((filterName: string, index: number) => (
                                                        <button onClick={handleClearFilter(key, filterName)} key={`${key}-${index}`} style={{ position: 'relative', padding: '5px 30px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
                                                            <span
                                                                style={{ width: '15px', position: 'absolute', zIndex: '10', color: 'var(--black)', top: -5, right: 0, border: 'none', borderRadius: '100%', fontSize: '1.5rem' }}
                                                            >
                                                                x
                                                            </span>
                                                            {filterName}
                                                        </button>
                                                    ));
                                                })
                                            }
                                        </div>
                                    </div>
                                )}
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
                                averageRating={dish.rating.averageRating}
                                discount={0}
                                name={dish.name}
                                price={dish.price}
                                isFavorite={dish.isFavorite}
                            />
                        </Grid>
                    )) :
                        dishes.map((dish: BaseDishProps) => (
                            <Grid item key={dish._id} xs={12} sm={6} md={3} lg={3}>
                                <DishCard
                                    _id={dish._id}
                                    image={dish.image}
                                    itemSold={0}
                                    discount={0}
                                    name={dish.name}
                                    price={dish.price}
                                    averageRating={dish.rating.averageRating}
                                    isFavorite={dish.isFavorite}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
        </div>
    )
}