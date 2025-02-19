const express = require('express');
const apiRoute = express();

const UserRouter = require('../apps/user/user-router');
const CartRouter = require('./../apps/cart/cart-router');
const CouponRouter = require('./../apps/coupon/coupon-router');
const FavoriteRouter = require('./../apps/favorite/favorite-router');
const OrderRouter = require('./../apps/order/order-router');
const OrderDetailRouter = require('./../apps/order_detail/order-detail-router');
const TransactionRouter = require('../apps/transaction/transaction-router');
const DishRouter = require('./../apps/dish/dish-router');
const CategoryRouter = require('./../apps/category/category-router');
const AuthRouter = require('./../apps/auth/auth-router');
const PaymentRouter = require('./../apps/payment/payment-router');
const StockRouter = require('../apps/stock/stock-router');
const BalanceRouter = require('../apps/balance/balance-router');
const RatingRouter = require('../apps/rating/rating-router');

apiRoute.use('/dishes', DishRouter);
apiRoute.use('/carts', CartRouter);
apiRoute.use('/stocks', StockRouter);
apiRoute.use('/coupons', CouponRouter);
apiRoute.use('/favorites', FavoriteRouter);
apiRoute.use('/orders', OrderRouter);
apiRoute.use('/order-details', OrderDetailRouter);
apiRoute.use('/transactions', TransactionRouter);
apiRoute.use('/categories', CategoryRouter);
apiRoute.use('/payments', PaymentRouter);
apiRoute.use('/users', UserRouter);
apiRoute.use('/auth', AuthRouter);
apiRoute.use('/balances', BalanceRouter);
apiRoute.use('/ratings', RatingRouter);

module.exports = apiRoute;
