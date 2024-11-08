const origin: string = "http://localhost:1337/";

//* USER API
const baseUserApi: string = 'api/v1/users'
const updateUserProfileApi: string = `${baseUserApi}/:userId`
const getUserAddressListApi: string = `${baseUserApi}/:userId/addresses`
const createUserAddressApi: string = `${baseUserApi}/:userId/addresses`
const updateUserAddressApi: string = `${baseUserApi}/:userId/addresses`
const getUserByUserIdApi: string = `${baseUserApi}`

//* CATEGORY API
const baseCategoryApi: string = 'api/v1/categories'
const getCategoriesApi: string = `${baseCategoryApi}`;

//* DISH API
const baseDishApi: string = 'api/v1/dishes'
const getPopularDishApi: string = `${baseDishApi}/popular-dishes`;
const getDishesByNameApi: string = `${baseDishApi}/search`;

//* FAVORITE API
const baseFavoriteApi: string = 'api/v1/favorites'
const updateFavoriteDishApi: string = `${baseFavoriteApi}`

//* ORDER API
const baseOrderApi: string = 'api/v1/orders'
const getRecentOrdersByUserIdApi: string = `${baseOrderApi}/recent-orders/users`;
const getOrderHistoryByUserIdApi: string = `${baseOrderApi}/history/users`;

//* BALANCE API
const basePaymentApi: string = 'api/v1/payments'
const baseBalanceApi: string = 'api/v1/balances'
const getBalanceApi: string = `${baseBalanceApi}`
const topUpApi = `${basePaymentApi}/top-up`

//* AUTH API
const baseAuthApi: string = 'api/v1/auth'
const loginApi: string = `${baseAuthApi}/login`;
const registerApi: string = `${baseAuthApi}/register`;
const logoutApi: string = `${baseAuthApi}/logout`;
const refreshTokenApi: string = `${baseAuthApi}/refresh-token`;

//* CART API
const baseCartApi: string = 'api/v1/carts'
const getCartByUserIdApi: string = `${baseCartApi}/users`;



export {
  origin,
  baseAuthApi,
  baseCartApi,
  baseDishApi,
  baseCategoryApi,
  baseOrderApi,
  baseUserApi,
  basePaymentApi,
  baseBalanceApi,
  baseFavoriteApi,

  getUserAddressListApi,
  getUserByUserIdApi,
  createUserAddressApi,
  updateUserAddressApi,
  updateUserProfileApi,
  getCategoriesApi,
  getPopularDishApi,
  getDishesByNameApi,
  getRecentOrdersByUserIdApi,
  getOrderHistoryByUserIdApi,
  getCartByUserIdApi,
  updateFavoriteDishApi,

  getBalanceApi,
  topUpApi,

  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi
};
