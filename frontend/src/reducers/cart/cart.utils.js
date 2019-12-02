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

  return [...cartItems, { ...cartItemToAdd /*, quantity: 1 */ }];
};
