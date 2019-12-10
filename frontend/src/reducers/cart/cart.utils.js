import axios from "axios";

const getData = async (body, config) => {
  let res = await axios.post("/order-catalogue-form", body, config);
  return { getData: res.data };
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
    secondary_mobile: data.secondary_mobile,
    service: data.catalogueData.title,
    subscriber: `${data.first_name} ${data.last_name}`,
    approved_by: "Admin",
    price: data.catalogueData.price,
    logo: data.catalogueData.logo,
    version: data.catalogueData.version
  });

  let res = await axios.post("/order-catalogue-form", body, config);
  return { getData: res.data };
};
