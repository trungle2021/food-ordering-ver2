import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import searchDishesReducer from "../features/Dish/SearchDish/searchDishesSlice";
import balanceReducer from '../features/Balance/balanceSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/Order/orderSlice';
import addressReducer from '../features/User/userSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



const combinedReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  searchDishes: searchDishesReducer,
  balance: balanceReducer,
  cart: cartReducer,
  order: orderReducer,
  address: addressReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","user"],
};

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "USER_LOGOUT") {
    state = {} as RootState;
  }
  return combinedReducers(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
