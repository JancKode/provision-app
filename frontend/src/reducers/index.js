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

const rootReducer = combineReducers({
  auth: authReducer,
  errors,
  messages,
  catalogue: catalogueReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);
