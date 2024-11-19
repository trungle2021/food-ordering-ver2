import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  FormGroup,
  Grid,
  Slider,
} from '@mui/material';
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
import { BaseDishProps, DishQueryParams } from '~/interface/dish';
import { useCategories } from './hooks/useCategories';
import { useDishData } from './hooks/useDishData';
import { useFilters } from './hooks/useFilters';
import { FilterTag } from '~/components/common/FilterTag';

interface CheckedCategoriesProps {
  [key: string]: boolean;
}

export const DishPage = () => {
  const history = useHistory();
  const searchDishes = useSelector((state: any) => state.searchDish);
  const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem();
  const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 10 : isLg ? 8 : isXl ? 10 : 2;
  const searchDishesData = searchDishes.data;
  const categoryLimit = isXs ? 4 : isSm ? 6 : isMd ? 8 : isLg ? 10 : isXl ? 12 : 4;

  const queryParams = useQuery();

  const [open, setOpen] = useState(false);
  const {
    dishes,
    isLoading: isLoadingDishes,
    error: errorDishes,
  } = useDishData(dishLimit, queryParams);
  const {
    categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories(categoryLimit);
  const { filters, syncToUrl, updateFilters, resetFilters } = useFilters();
  const [checkedCategories, setCheckedCategories] = useState<CheckedCategoriesProps>({});
  const [valuePriceRange, setValuePriceRange] = useState<number[]>([0, 50]);
  useClearSearchData();

//   const setDefaultFilter = () => {
//     if (queryParams.has('category_name')) {
//       setDefaultCheckedCategories();
//     }

//     if (queryParams.has('sort')) {
//       setDefaultSortBy();
//     }

//     if (queryParams.has('price[gte]') && queryParams.has('price[lte]')) {
//       setDefaultPriceRange();
//     }
//   };

//   const setDefaultCheckedCategories = () => {
//     const categoryNames = queryParams.getAll('category_name');
//     if (categories.length > 0 && categoryNames?.length > 0) {
//       categories.forEach((category: CategoryProps) => {
//         let categoryId = category._id;
//         let categoryName = category.name;
//         if (categoryNames.includes(categoryName)) {
//           checkedCategories[categoryId] = true;
//         } else {
//           checkedCategories[categoryId] = false;
//         }
//       });
//       setCheckedCategories(checkedCategories);
//       updateApplyingFilter();
//     }
//   };

//   const setDefaultSortBy = () => {
//     const sortByParams = queryParams.getAll('sort');
//     if (sortByParams.length > 0) {
//       updateApplyingFilter();
//     }
//   };

//   const setDefaultPriceRange = () => {
//     const priceFrom = queryParams.get('price[gte]');
//     const priceTo = queryParams.get('price[lte]');
//     if (priceFrom && priceTo) {
//       updateApplyingFilter();
//     }
//   };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setValuePriceRange(newValue as number[]);
  };

  const handlePriceRangeChangeCommited = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      updateFilters({ priceRange: { min: newValue[0], max: newValue[1] } });
      syncToUrl({ ...filters, priceRange: { min: newValue[0], max: newValue[1] } });
    }
  };

  const handleCategoryCheckBoxChange = (dataChanged: CheckedCategoriesProps,catIdChanged: string) => {
    const isChecked = dataChanged[catIdChanged];
    const category = categories.find((category) => category._id === catIdChanged);
    if (!category) return;

    const currentCategories = queryParams.getAll('category_name');
    const updatedCategories = isChecked 
    ? [...currentCategories, category.name]
    : currentCategories.filter(name => name !== category.name);

    // Update both state and URL in one go
    updateFilters({ categories: updatedCategories });
    syncToUrl({ ...filters, categories: updatedCategories });
    setCheckedCategories(dataChanged);
  };

  const handleClickSortBy = (filter: { sort: string }) => () => {
    const { sort } = filter;
    const currentSorts = queryParams.getAll('sort');
    let newSorts = [...currentSorts];

    // Remove opposite sort if exists
    if (sort === 'price-desc') {
      newSorts = newSorts.filter(s => s !== 'price-asc');
    } else if (sort === 'price-asc') {
      newSorts = newSorts.filter(s => s !== 'price-desc');
    }

    if (sort === 'created_at-asc') {
      newSorts = newSorts.filter(s => s !== 'created_at-desc');
    } else if (sort === 'created_at-desc') {
      newSorts = newSorts.filter(s => s !== 'created_at-asc');
    }

    // Add new sort if it's not already present
    if (!newSorts.includes(sort)) {
      newSorts.push(sort);
    }

    // Update both state and URL
    updateFilters({ sort: newSorts });
    syncToUrl({ ...filters, sort: newSorts });
  };

  const handleClearFilter = (key: string, value?: string | number) => {
    switch (key) {
      case "categories":
        updateFilters({ categories: filters?.categories?.filter((cat: string) => cat !== value) });
        syncToUrl({ ...filters, categories: filters?.categories?.filter((cat: string) => cat !== value) });
        break;
      case "sort":
        updateFilters({ sort: filters?.sort?.filter((sort: string) => sort !== value) });
        syncToUrl({ ...filters, sort: filters?.sort?.filter((sort: string) => sort !== value) });
        break;
      case "priceRange":
        updateFilters({ priceRange: undefined });
        queryParams.delete('price[gte]');
        queryParams.delete('price[lte]');
        break;
    }   
  };

  const handleResetFilter = () => {
    queryParams.delete('category_name');
    queryParams.delete('sort');
    queryParams.delete('price[gte]');
    queryParams.delete('price[lte]');
    setCheckedCategories({});
    updateFilters({ categories: [], sort: [], priceRange: undefined });
    syncToUrl({ ...filters, categories: [], sort: [], priceRange: undefined });
  };


  const toggleFilterAction = (newOpen: boolean) => async () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ padding: '50px' }}>
      <HeaderPage pageName="Dishes" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchDish />

        <Drawer
          sx={{ width: '350px' }}
          anchor="right"
          open={open}
          onClose={toggleFilterAction(false)}
        >
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <h1>Filter & Sort</h1>
          </div>
          <Divider />
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {
              <div style={{ padding: '10px 0' }}>
                <h2 style={{ paddingBottom: '10px' }}>Applying Filter </h2>
                <button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '5px',
                    backgroundColor: 'grey',
                    color: 'var(--white)',
                    padding: '0 10px',
                    fontSize: '1.2rem',
                  }}
                  onClick={handleResetFilter}
                >
                  Reset
                </button>
                <div
                  style={{
                    display: 'flex',
                    width: '350px',
                    gap: '10px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                {filters?.categories?.map((categoryName: string) => (
                  <FilterTag
                    key={categoryName}
                    label={categoryName}
                    onRemove={() =>handleClearFilter("categories", categoryName)}
                  />
                ))}
                {filters?.sort?.map((sortType: string) => (
                  <FilterTag
                    key={sortType}
                    label={sortType}
                    onRemove={() =>handleClearFilter("sort", sortType)}
                  />
                ))}
                {filters?.priceRange && (
                  <FilterTag
                    key={`${filters.priceRange.min}-${filters.priceRange.max}`}
                    label={`Price: ${filters.priceRange.min}$ - ${filters.priceRange.max}$`}
                    onRemove={() =>handleClearFilter("priceRange")}
                  />
                )}
                </div>
              </div>
            }
          </div>
          <Divider />

          <Box sx={{ width: 350 }} role="presentation">
            <Accordion disableGutters defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="category-content"
                id="category-header"
              >
                <h2>Category</h2>
              </AccordionSummary>
              <AccordionDetails id="category-content">
                {categories.length > 0 && checkedCategories && (
                  <CategoryCheckBox
                    categories={categories}
                    checkedCategories={checkedCategories}
                    onChange={handleCategoryCheckBoxChange}
                  />
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="sortBy-content"
                id="sortBy-header"
              >
                <h2>Sort By</h2>
              </AccordionSummary>
              <AccordionDetails id="sortBy-content">
                <FormGroup>
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="Vertical button group"
                    variant="contained"
                    sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                  >
                    <Button onClick={handleClickSortBy({ sort: 'price-asc' })}>
                      Price (lowest - highest)
                    </Button>
                    <Button onClick={handleClickSortBy({ sort: 'created_at-desc' })}>Newest</Button>
                    <Button onClick={handleClickSortBy({ sort: 'created_at-asc' })}>Oldest</Button>
                    <Button onClick={handleClickSortBy({ sort: 'price-desc' })}>
                      Price (highest - lowest)
                    </Button>
                  </ButtonGroup>
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="price-content"
                id="price-header"
              >
                <h2>Price</h2>
              </AccordionSummary>
              <AccordionDetails id="price-content">
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
        <button
          onClick={toggleFilterAction(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}
        >
          Filter & Sort <TuneIcon />{' '}
        </button>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Grid container spacing={5}>
          {searchDishesData
            ? searchDishesData.map((dish: BaseDishProps) => (
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
              ))
            : dishes.map((dish: BaseDishProps) => (
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
  );
};
