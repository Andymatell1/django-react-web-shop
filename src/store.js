import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import {
  productListreducer,
  productDetailsreducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListreducer,
  productDetails: productDetailsreducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
});

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userFromStorage },
};

// ✅ Correct usage with configureStore
const store = configureStore({
  reducer,
  preloadedState, // not initialState
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// In your store instead of in the action / thunk idk if those are the same thing
store.subscribe(() => {
  const {
    cart: { cartItems },
  } = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

export default store;
