const origin = "http://localhost:1337";
const getCategoriesApi = `${origin}/api/v1/categories`;
const getPopularDishesApi = `${origin}/api/v1/dishes/popular-dishes`;
const getRecentOrdersApi = `${origin}/api/v1/users/USERID/recent-orders`;
const loginApi = `${origin}/api/v1/auth/login`;
const registerApi = `${origin}/api/v1/auth/register`

module.exports = {
    origin,
    getCategoriesApi,
    getPopularDishesApi,
    getRecentOrdersApi,
    loginApi,
    registerApi
}