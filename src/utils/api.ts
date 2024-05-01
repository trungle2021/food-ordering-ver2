const origin: string = "http://localhost:1337/";
const getCategoriesApi: string = `api/v1/categories`;
const getPopularDishesApi: string = `api/v1/dishes/popular-dishes`;
const getRecentOrdersApi: string = `api/v1/users/USERID/recent-orders`;
const loginApi: string = `api/v1/auth/login`;
const registerApi: string = `api/v1/auth/register`;
const logoutApi: string = `api/v1/auth/logout`;
const refreshTokenApi: string = `api/v1/auth/refresh-token`;

export {
  origin,
  getCategoriesApi,
  getPopularDishesApi,
  getRecentOrdersApi,
  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi
};
