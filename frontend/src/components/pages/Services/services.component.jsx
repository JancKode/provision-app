import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Dashboard from "../../dashboard/Dashboard";

import Cards from "../../cards/cards";

const ServicesPage = ({ auth }) => {
  const { isAuthenticated } = auth;
  return (
    <Dashboard>
      {isAuthenticated ? <Cards /> : <Redirect to="login" />}
    </Dashboard>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ServicesPage);
