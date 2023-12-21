const origin = "http://localhost:1337/api";
const getCategoriesApi = `${origin}/v1/categories`;
const getPopularDishesApi = `${origin}/v1/dishes/popular-dishes`;
const getRecentOrdersApi = `${origin}/v1/users/USERID/recent-orders`;

export {
    getCategoriesApi,
    getPopularDishesApi,
    getRecentOrdersApi
}