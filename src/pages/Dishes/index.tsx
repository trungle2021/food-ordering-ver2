import { SyntheticEvent, useEffect, useState } from 'react';
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
import BaseDishProps from '~/interface/dish/baseDish';
import CategoryProps from '~/interface/category/category';


interface CheckedCategoriesProps {
    [key: string]: boolean
}

interface ApplyingFilter {
    category_name?: string;
    sort_by?: string;
}


export const DishPage = () => {
    useClearSearchData()

    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [applyingFilter, setApplyingFilter] = useState<ApplyingFilter>({})
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [valuePriceRange, setValuePriceRange] = useState<number[]>([0, 100]);
    const [checkedCategories, setCheckedCategories] = useState<CheckedCategoriesProps>({})

    const searchDishes = useSelector((state: any) => state.searchDish)
    const searchDishesData = searchDishes.data
    const queryParams = useQuery()
    const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()

    const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 10 : isLg ? 8 : isXl ? 10 : 2

    useEffect(() => {
        if (queryParams.has('category_name')) {
            setDefautlCheckedCategories()
        }
        if (queryParams.has('sort_by')) {
        }
    }, [queryParams])

    useEffect(() => {
        getDishes();

    }, [queryParams, dishLimit]);

    const getDishes = async () => {
        const response = await DishService.getDishes(queryParams.toString(), dishLimit);
        setDishes(response.data);
    };

    const setDefautlCheckedCategories = () => {
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
        const category = categories.find((category) => category._id === categoryIdChanged);
        const existingCategoriesQueryParam = queryParams.get('category_name');

        let updatedCategoryNames: string[] = [];

        if (existingCategoriesQueryParam) {
            updatedCategoryNames = existingCategoriesQueryParam.split(',');

            if (isChecked) {
                // Add the new category name if it's not already in the list
                if (!updatedCategoryNames.includes(category?.name as string)) {
                    updatedCategoryNames.push(category?.name as string);
                }
            } else {
                // Remove the category name from the list
                updatedCategoryNames = updatedCategoryNames.filter((categoryName) => categoryName !== category?.name);
            }

            // Update queryParams
            if (updatedCategoryNames.length === 0) {
                queryParams.delete('category_name');
            } else {
                queryParams.set('category_name', updatedCategoryNames.join(','));
            }
        } else {
            // Add the category name if it was not previously set
            updatedCategoryNames.push(category?.name as string)
            queryParams.set('category_name', category?.name as string);
        }

        // Update applyingFilter state
        const updatedFilter = {
            ...applyingFilter,
            category_name: updatedCategoryNames.join(','),
        };
        setApplyingFilter(updatedFilter);

        // Push updated queryParams to the URL
        history.push({ search: queryParams.toString() });
    };


    const handleClickSortBy = (filter: { sort_by: string }) => () => {
        const { sort_by } = filter;
        let newSortByParamString = '';
        const sortByParamString = queryParams.get('sort_by')?.toString();

        if (!sortByParamString) {
            newSortByParamString = sort_by;
        } else if (sortByParamString.includes(sort_by)) {
            newSortByParamString = sortByParamString;
        } else {
            switch (sort_by) {
                case 'price_asc':
                    if (sortByParamString.includes('price_desc')) {
                        newSortByParamString = sortByParamString.replace('price_desc', sort_by);
                    } else {
                        newSortByParamString = sortByParamString.concat(',', sort_by);
                    }
                    break;
                case 'price_desc':
                    if (sortByParamString.includes('price_asc')) {
                        newSortByParamString = sortByParamString.replace('price_asc', sort_by);
                    } else {
                        newSortByParamString = sortByParamString.concat(',', sort_by);
                    }
                    break;
                case 'newest':
                    if (sortByParamString.includes('price') && sortByParamString.includes('best_seller')) {
                        newSortByParamString = sortByParamString.replace('best_seller', sort_by);
                    } else {
                        newSortByParamString = sortByParamString.concat(',', sort_by);
                    }
                    break;
                case 'best_seller':
                    if (sortByParamString.includes('price') && sortByParamString.includes('newest')) {
                        newSortByParamString = sortByParamString.replace('newest', sort_by);
                    } else {
                        newSortByParamString = sortByParamString.concat(',', sort_by);
                    }
                    break;
                default:
                    newSortByParamString = 'price_asc';
            }
        }

        queryParams.set('sort_by', newSortByParamString);

        const currentFilter = {
            ...applyingFilter,
            'sort_by': newSortByParamString
        };
        setApplyingFilter(currentFilter);
        history.push({ search: queryParams.toString() });
    };


    const handleClearFilter = (key: string, value: string) => (event: SyntheticEvent) => {
        // Your logic to handle clearing the filter by key and value
        console.log("Filter Key: ", key);
        console.log("Filter Value: ", value);

        const cloneAppLyingFilter = { ...applyingFilter };
        let updatedFilterString: string = ''
        switch (key) {
            case 'price_range':
                // updatedFilter.price_range = undefined;
                break;
            case 'category_name':
                if (cloneAppLyingFilter.category_name) {
                    updatedFilterString = cloneAppLyingFilter.category_name.split(',').filter((filter: string) => filter !== value).join(',')
                    if (updatedFilterString) {
                        cloneAppLyingFilter.category_name = updatedFilterString
                        queryParams.set('category_name', updatedFilterString)
                    } else {
                        delete cloneAppLyingFilter.category_name
                        queryParams.delete('category_name')
                    }
                }
                break;
            case 'sort_by':
                if (cloneAppLyingFilter.sort_by) {
                    updatedFilterString = cloneAppLyingFilter.sort_by.split(',').filter((filter: string) => filter !== value).join(',')
                    cloneAppLyingFilter.sort_by = updatedFilterString
                }
                break;
            default:
                break;
        }
        console.log("CloneApplyingFilter", cloneAppLyingFilter)
        setApplyingFilter(cloneAppLyingFilter);
        history.push({ search: queryParams.toString() });
    };


    return (
        <div style={{ padding: '50px' }}>
            <HeaderPage pageName="Dishes" />
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <SearchDish />
                <Drawer sx={{ width: '350px' }} anchor='right' open={open} onClose={toggleFilterAction(false)}>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <h1>Filter & Sort</h1>
                    </div>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        {(applyingFilter.category_name || applyingFilter.sort_by) &&
                            (
                                <>
                                    <h2>Applying Filter</h2>
                                    <div style={{ display: 'flex', width: '350px', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        {
                                            Object.entries(applyingFilter).map(([key, value]: [string, string]) => {
                                                const filterArray = value.split(',');
                                                return filterArray.map((filterName: string, index: number) => (
                                                    <button key={`${key}-${index}`} style={{ position: 'relative', padding: '5px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
                                                        <span
                                                            style={{ position: 'absolute', color: 'var(--black)', top: -10, right: 0, backgroundColor: 'var(--white)', border: 'none', borderRadius: '100%', fontSize: '1.5rem' }}
                                                            onClick={handleClearFilter(key, filterName)}
                                                        >
                                                            x
                                                        </span>
                                                        {filterName}
                                                    </button>
                                                ));
                                            })
                                        }
                                    </div>
                                </>
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
                                        <Button onClick={handleClickSortBy({ sort_by: 'price_asc' })}>Price (lowest - highest)</Button>
                                        <Button onClick={handleClickSortBy({ sort_by: 'newest' })}>Newest</Button>
                                        <Button onClick={handleClickSortBy({ sort_by: 'best_seller' })}>Best Seller</Button>
                                        <Button onClick={handleClickSortBy({ sort_by: 'price_desc' })}>Price (highest - lowest)</Button>
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


