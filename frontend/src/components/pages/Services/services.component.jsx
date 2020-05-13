import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Dashboard from "../../dashboard/Dashboard";

import Cards from "../../cards/cards";

import {WithSpinner} from '../../with-spinner/with-spinner.compoent';

const ServicesPage = ({ auth, ...otherProps }) => {
  const { isAuthenticated } = auth;
  console.log('CardsWithSpinner', otherProps)
  return (
    <Dashboard>
      {isAuthenticated ? <Cards {...otherProps}/> : <Redirect to="login" />}
    </Dashboard>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ServicesPage);
