const origin: string = "http://localhost:1337/";

//* USER API
const baseUserApi: string = 'api/v1/users'

//* CATEGORY API
const baseCategoryApi: string = 'api/v1/categories'

//* DISH API
const baseDishApi: string = 'api/v1/dishes'

//* FAVORITE API
const baseFavoriteApi: string = 'api/v1/favorites'

//* ORDER API
const baseOrderApi: string = 'api/v1/orders'


//* BALANCE API
const basePaymentApi: string = 'api/v1/payments'
const baseBalanceApi: string = 'api/v1/balances'

//* AUTH API
const baseAuthApi: string = 'api/v1/auth'

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
  getCartByUserIdApi,
};
