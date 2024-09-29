import axios from "~/lib/axios";
import { baseDishApi, getDishesByNameApi, getPopularDishApi } from "~/utils/api";

const mapSortParam = (param: string): string => {
    switch (param) {
        case 'Price-Ascending':
            return 'price';
        case 'Price-Descending':
            return '-price';
        case 'Newest':
            return '-created';
        default:
            return param;
    }
};

const replaceSortParams = (queryParams: string): string => {
    return queryParams.replace(/sort=([^&]*)/g, (_, sortValue) => {
        return `sort=${mapSortParam(sortValue)}`;
    });
};


const getDishes = (queryParams:string, limit: number): Promise<any> => {
    const modifiedQueryParams = replaceSortParams(queryParams);
    
    return axios.get(`${baseDishApi}?${modifiedQueryParams}&limit=${limit}`);
}

const getPopularDishes = (limit: number): Promise<any> => {
    return axios.get(`${getPopularDishApi}?limit=${limit}`);
};

const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
    return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
}

export const DishService = {
    getDishes,
    getPopularDishes,
    searchDishes
};

export default DishService;
