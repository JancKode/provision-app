import CartActionTypes from "./cart.type";

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const updateItemStatus = () => ({
  type: CartActionTypes.UPDATE_ITEM_STATUS
})

export const getAllOrderData = (orderData) => ({
  type: CartActionTypes.GET_ALL_ORDER,
  payload: orderData
})

export const CART_ERROR = () => ({
  type: CartActionTypes.CART_ERROR
})

