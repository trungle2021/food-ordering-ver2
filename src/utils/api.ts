const origin: string = "http://localhost:1337/";
const baseAuthApi: string = 'api/v1/auth'
const baseUserApi: string = 'api/v1/users'
const baseUserAddressApi: string = 'api/v1/user-addresses'
const baseCartApi: string = 'api/v1/carts'
const baseDishApi: string = 'api/v1/dishes'
const baseCategoryApi: string = 'api/v1/categories'
const baseOrderApi: string = 'api/v1/orders'

const getUserAddressApi: string = `${baseUserAddressApi}/users`


const getUserInfoApi: string = `${baseUserApi}`

const getCategoriesApi: string = `${baseCategoryApi}`;
const getPopularDishesApi: string = `${baseDishApi}/popular-dishes`;
const getDishesByNameApi: string = `${baseDishApi}/search`;
const getRecentOrdersApi: string = `${baseOrderApi}/recent-orders`;
const getOrderHistoryApi: string = `${baseOrderApi}/history`;

const loginApi: string = `${baseAuthApi}/login`;
const registerApi: string = `${baseAuthApi}/register`;
const logoutApi: string = `${baseAuthApi}/logout`;
const refreshTokenApi: string = `${baseAuthApi}/refresh-token`;
const getCartApi: string = `${baseCartApi}`;


export {
  origin,
  baseAuthApi,
  baseCartApi,
  baseDishApi,
  baseCategoryApi,
  baseOrderApi,
  baseUserApi,
  baseUserAddressApi,

  getUserAddressApi,
  getUserInfoApi,

  getCategoriesApi,
  getPopularDishesApi,
  getDishesByNameApi,
  getRecentOrdersApi,
  getOrderHistoryApi,
  getCartApi,

  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi
};
