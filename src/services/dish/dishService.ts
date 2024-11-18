import { DishQueryParams, SortField } from '~/interface/dish';
import { SortOrder } from '~/interface/dish';
import axios from '~/lib/axios';
import { baseDishApi, getDishesByNameApi, getPopularDishApi } from '~/utils/api';



const DEFAULT_SORT: { field: SortField; order: SortOrder } = {
  field: 'created_at',
  order: 'desc'
};

const DEFAULT_PARAMS = {
  page: 1,
  limit: 10,
  sort: DEFAULT_SORT
}



const getDishes = async (params: DishQueryParams = DEFAULT_PARAMS): Promise<any> => {
   const queryParams = new URLSearchParams();
   console.table(params);


  //   // Handle categories
  // if (params.category) {
  //   const categories = Array.isArray(params.category) ? params.category : [params.category];
  //   categories.forEach((category: string) => {
  //     queryParams.append('category.name', category);
  //   });
  // }


  // // Handle sorting with mapping
  // if (params.sort) {
  //   console.log("Params has sort")
  //   queryParams.append('sort', params.sort.toString());
  // }



 

  // // Handle pagination


  if (params.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  // console.table(queryParams);


  try {
    const response = await axios.get(`${baseDishApi}?${queryParams.toString()}`);
    return response.data;
  } catch (error: any) {
      throw new Error(`Failed to fetch dishes: ${error.response?.data?.message || error.message}`);
  }
};

const getPopularDishes = (params?: Omit<DishQueryParams, 'sort'>): Promise<any> => {
  return getDishes({
    ...params,
    sort: {
      field: 'itemSold',
      order: 'desc'
    }
  });
};


const searchDishes = (keyword: string, limit: number = 10): Promise<any> => {
  return axios.get(`${getDishesByNameApi}?keyword=${keyword}&limit=${limit}`);
};

export const DishService = {
  getDishes,
  getPopularDishes,
  searchDishes,
};

// export default DishService;


// interface DishFilters {
//   category?: string[];
//   sort?: SortOption[];
//   page?: number;
//   limit?: number;
//   minPrice?: number;
//   maxPrice?: number;
//   keyword?: string;
// }

// const getDishes = async (filters: DishFilters): Promise<any> => {
//   const queryParams = new URLSearchParams();

//   // Add categories
//   filters.category?.forEach(cat => 
//     queryParams.append('category', cat)
//   );

//   // Add sort
//   if (filters.sort?.length) {
//     const sortString = filters.sort
//       .map(s => `${s.field}-${s.order}`)
//       .join(',');
//     queryParams.append('sort', sortString);
//   }

//   // Add pagination
//   if (filters.page) queryParams.append('page', filters.page.toString());
//   if (filters.limit) queryParams.append('limit', filters.limit.toString());

//   // Add price range
//   if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
//   if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());

//   // Add search
//   if (filters.keyword) queryParams.append('keyword', filters.keyword);

//   return axios.get(`${baseDishApi}?${queryParams.toString()}`);
// };

// // Usage examples:
// getDishes({
//   category: ['Pizza', 'Salad'],
//   sort: [
//     { field: 'price', order: 'asc' },
//     { field: 'created_at', order: 'desc' }
//   ],
//   page: 1,
//   limit: 10
// });

// getDishes({
//   category: ['Pizza'],
//   minPrice: 10,
//   maxPrice: 50,
//   sort: [{ field: 'rating', order: 'desc' }]
// });