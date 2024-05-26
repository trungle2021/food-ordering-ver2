const origin: string = "http://localhost:1337/";
const baseAuthApi: string = 'api/v1/auth'
const baseCartApi: string = 'api/v1/carts'
const baseDishApi: string = 'api/v1/dishes'
const baseCategoryApi: string = 'api/v1/categories'
const baseOrderApi: string = 'api/v1/orders'

const getCategoriesApi: string = `${baseCategoryApi}`;
const getPopularDishesApi: string = `${baseDishApi}/popular-dishes`;
const getDishesByNameApi: string = `${baseDishApi}/search`;
const getRecentOrdersApi: string = `${baseOrderApi}/recent-orders/users/USERID`;
const loginApi: string = `${baseAuthApi}/login`;
const registerApi: string = `${baseAuthApi}/register`;
const logoutApi: string = `${baseAuthApi}/logout`;
const refreshTokenApi: string = `${baseAuthApi}/refresh-token`;
const getCartApi: string = `${baseCartApi}/user`;


export {
  origin,
  baseAuthApi,
  baseCartApi,
  baseDishApi,
  baseCategoryApi,
  baseOrderApi,

  getCategoriesApi,
  getPopularDishesApi,
  getDishesByNameApi,
  getRecentOrdersApi,
  getCartApi,

  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi
};
