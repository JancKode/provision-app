import axios from "axios";
import uniqid from "uniqid";

export const getData = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(`data[itemId], ${data}`);
  const body = JSON.stringify({
    itemId: data,
    updateSta: 'getData'
    
  });
  let res;
  try {
    res = await axios.post("/order-status-info", body, config);
    return res.data;
  } catch (error) {
    console.log(`getData error`, error);
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
    updateSta: 'cancelOrder',
    status: 'Cancelled'

  });
  let res;

  try {
    res = await axios.post("/order-status-info", body, config);
    return res.data
  } catch (error) {
    console.log(`Encountered error while cancelling order`, error)
    return error
  }
}

export const activateOrder = async itemId => {

  let res;
  const config = {
    headers: {
      "Content-Type": 'application/json'
    }
  }

  const body = JSON.stringify({
    itemId: itemId,
    updateSta: 'approveOrder',
    status: 'Active'

  })


  try{
    res = await axios.post('/order-status-info', body, config);
    return res.data
  } catch (error) {
    console.log(`Encountered error while approving order`, error)
    return error;
  }


}

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
