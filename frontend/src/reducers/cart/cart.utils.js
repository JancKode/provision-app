import axios from "axios";
import uniqid from "uniqid";

import CartActionTypes from "./cart.type";
import returnErrors from "../messages";


const appStageEnv = process.env.REACT_APP_STAGE

export const orderData = userId => dispatch => {
  let res;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    userId: userId,
    updateSta: "getAllOrderData",
  });


  if(appStageEnv === 'dev'){
    try {
      res = axios.post("/order-status", body, config).then(res => {
        console.log(`post result`, res.data);
        dispatch({
          type: CartActionTypes.GET_ALL_ORDER,
          payload: res.data
        });
        // return res.data
      });
      console.log(`userId inside order_data`, res.data);
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: CartActionTypes.CART_ERROR
      });
      console.log(`error in getting order Data`, error);
      return error;
    }

  }else if(appStageEnv === 'mock'){
    try {
      res = axios.get("https://d05ea3e3-649a-4145-b292-c4ed31dc6ab6.mock.pstmn.io/order-status", body, config).then(res => {
        console.log(`post result`, res.data);
        dispatch({
          type: CartActionTypes.GET_ALL_ORDER,
          payload: res.data
        });
        // return res.data
      });
      console.log(`userId inside order_data`, res.data);
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: CartActionTypes.CART_ERROR
      });
      console.log(`error in getting order Data`, error);
      return error;
    }
  }

  
};

export const getData = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(`data[itemId], ${data}`);
  const body = JSON.stringify({
    itemId: data,
    updateSta: "getData"
  });
  let res;

  try {
    res = await axios.post("/order-status-info", body, config);
    return res.data;
  } catch (error) {
    console.log(`getData error`, error.response);
    return error;
  }
};

export const cancelOrder = async itemId => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(`data[itemId], ${itemId}`);
  const body = JSON.stringify({
    itemId: itemId,
    updateSta: "cancelOrder",
    status: "Cancelled"
  });
  let res;

  try {
    res = await axios.post("/order-status-info", body, config);
    return res.data;
  } catch (error) {
    console.log(`Encountered error while cancelling order`, error);
    return error;
  }
};

export const approveOrder = async (itemId, userId) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(`data[itemId], ${itemId}`);
  const body = JSON.stringify({
    itemId: itemId,
    updateSta: "approveOrder",
    approvalStatus: true,
    userId: userId
  });
  let res;
  try{
  res = await axios.post('/order-status', body, config)
  return res.data
  }catch(err){
    console.log(`error while approving data`, err);
    return err;
  }
}

export const activateOrder = async itemId => {
  let res;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    itemId: itemId,
    updateSta: "approveOrder",
    status: "Active"
  });

  try {
    res = await axios.post("/order-status-info", body, config);
    return res.data;
  } catch (error) {
    console.log(`Encountered error while approving order`, error);
    return error;
  }
};

export const updateEntry = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    itemId: data.item_id
  });

  let res = await axios.post("/order-status-info", body, config);

  return { result: res.data };
};

export const addItemToCart = (cartItems, cartItemToAdd) => {
  console.log(`cartItems[addItemToCart]`, cartItems);
  console.log(`cartItemToAdd[addItemToCart]`, cartItemToAdd);
  // const exisistingCartITem = cartItems.find(
  //   cartItem => cartItem.id === cartItemToAdd.id
  // );

  // if (exisistingCartITem) {
  //   return cartItems.map(cartItem =>
  //     cartItem.id === cartItemToAdd.id
  //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //       : cartItem
  //   );
  // }

  // let data = await getData(body, config);

  return [...cartItems, { ...cartItemToAdd /*, quantity: 1 */ }];
};

export const addDataToDb = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    user_id: data.uid,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    mobile: data.mobile,
    otherNumber: data.secondaryMobile,
    service: data.catalogueData.title,
    subscriber: `${data.first_name} ${data.last_name}`,
    approved_by: "Admin",
    price: data.catalogueData.price,
    logo: data.catalogueData.logo,
    version: data.catalogueData.version,
    itemId: uniqid(),
    status: data.status
  });

  let res = await axios.post("/order-catalogue-form", body, config);
  return { getData: res.data };
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  console.log(`removeItemFromCart`, cartItems);
  console.log(`removeItemFromCart`, cartItemToRemove);
  const exisistingCartITem = cartItems.find(
    cartItem => cartItem.item_id === cartItemToRemove.item_id
  );

  if (exisistingCartITem) {
    return cartItems.filter(
      cartItem => cartItem.item_id !== cartItemToRemove.item_id
    );
  }
};
