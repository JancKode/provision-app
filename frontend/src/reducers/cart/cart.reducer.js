import CartActionTypes from "./cart.type";

import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      console.log("state", state);
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.UPDATE_ITEM_STATUS:
      console.log('stateToUpdate', state);
      return {
        ...state,
        itemStatus: action.payload
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.GET_ALL_ORDER:
      return {
        ...state,
        cartItems: action.payload
      }
    default:
      return state;
  }
};

export default cartReducer;
