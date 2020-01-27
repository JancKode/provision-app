import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

//Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
