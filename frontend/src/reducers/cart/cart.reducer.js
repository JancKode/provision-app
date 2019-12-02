import CartActionTypes from "./cart.type";

import { addItemToCart /*, removeItemFromCart*/ } from "./cart.utils";

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
    // case CartActionTypes.REMOVE_ITEM:
    //   return {
    //     ...state,
    //     cartItems: removeItemFromCart(state.cartItems, action.payload)
    //   };
    default:
      console.log(`'jerjer`);
      return state;
  }
};

export default cartReducer;