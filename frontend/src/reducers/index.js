import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth";
import errors from "./errors";
import messages from "./messages";
import catalogueReducer from "./catalogue/catalogue.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"]
};

const appReducer = combineReducers({
  auth: authReducer,
  errors,
  messages,
  catalogue: catalogueReducer,
  cart: cartReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
