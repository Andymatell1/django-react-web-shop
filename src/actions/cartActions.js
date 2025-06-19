import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// export const addToCart = (id, qty) => async (dispatch, getState) => {
//     const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
//     dispatch({ // dispatch basically calls the reducer
//         type: CART_ADD_ITEM, payload: {
//             product: data._id, // this why in reducer has x.product and item.prodcut
//             name: data.name,
//             image: data.image,
//             price: data.price,
//             countInStock: data.countInStock,
//             qty: qty
//         }
//     })

//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
    console.log("HEYYYYY", qty)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
