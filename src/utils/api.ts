const origin: string = "http://localhost:1337/";
const baseAuthApi: string = 'api/v1/auth'
const baseUserApi: string = 'api/v1/users'
const baseCartApi: string = 'api/v1/carts'
const baseDishApi: string = 'api/v1/dishes'
const baseCategoryApi: string = 'api/v1/categories'
const baseOrderApi: string = 'api/v1/orders'
const basePaymentApi: string = 'api/v1/payments'
const baseBalanceApi: string = 'api/v1/balances'

//* USER API
const getUserAddressListApi: string = `${baseUserApi}/:userId/addresses`
const createUserAddressApi: string = `${baseUserApi}/:userId/addresses`
const updateUserAddressApi: string = `${baseUserApi}/:userId/addresses`
const getUserByUserIdApi: string = `${baseUserApi}`

//* CATEGORY API
const getCategoriesApi: string = `${baseCategoryApi}`;

//* DISH API
const getPopularDishApi: string = `${baseDishApi}/popular-dishes`;
const getDishesByNameApi: string = `${baseDishApi}/search`;

//* ORDER API
const getRecentOrdersByUserIdApi: string = `${baseOrderApi}/recent-orders/users`;
const getOrderHistoryByUserIdApi: string = `${baseOrderApi}/history/users`;

//* BALANCE API
const getBalanceApi: string = `${baseBalanceApi}`
const topUpApi = `${basePaymentApi}/top-up`

//* AUTH API
const loginApi: string = `${baseAuthApi}/login`;
const registerApi: string = `${baseAuthApi}/register`;
const logoutApi: string = `${baseAuthApi}/logout`;
const refreshTokenApi: string = `${baseAuthApi}/refresh-token`;

//* CART API
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

  getUserAddressListApi,
  getUserByUserIdApi,
  createUserAddressApi,
  updateUserAddressApi,

  getCategoriesApi,
  getPopularDishApi,
  getDishesByNameApi,
  getRecentOrdersByUserIdApi,
  getOrderHistoryByUserIdApi,
  getCartByUserIdApi,

  getBalanceApi,
  topUpApi,

  loginApi,
  registerApi,
  logoutApi,
  refreshTokenApi
};
