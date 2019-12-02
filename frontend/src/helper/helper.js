import React from "react";
import { connect } from "react-redux";

import { addItem } from "../reducers/cart/cart.actions";

const handleClick = (type, data) => {
  switch (type) {
    case type === true:
      localStorage.setItem("catalogueFormData", JSON.stringify(data));
      console.log("helper data", data);
      // addItem(data);
      // return <Redirect to="/service-catalogue" />;
      break;
    case "APPROVE":
      console.log("OK");
      break;
    default:
      return console.log("error");
  }
};

const mapDispatchToProps = dispatch => ({
  // clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item))
  // removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(handleClick);
