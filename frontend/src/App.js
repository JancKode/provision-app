import React, { Fragment, Component } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"


import { Route, Switch } from "react-router-dom";

import Alert from "./components/layout/Alert";
// import { loadUser } from "./actions/auth";

import Login from "./components/accounts/Login/Login";
import ServicesPage from "../src/components/pages/Services/services.component";
import {
  OrderStatusPage,
  OrderStatusInfoPage
} from "../src/components/pages/Orders/order-status.component";
import Register from "./components/accounts/Register/Register";
import PrivateRoute from "./components/common/PrivateRoute.jsx";

import './styles.scss';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Alert />
        <Switch>
          <PrivateRoute exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/service-catalogue" component={ServicesPage} />
          <Route exact path="/order-status" component={OrderStatusPage} />
          <Route exact path="/order-catalogue-form" component={OrderStatusInfoPage} />
          <Route exact path="/order-status-info" component={OrderStatusInfoPage} />
        </Switch>
        
      </Fragment>
    );
  }
}

export default App;
