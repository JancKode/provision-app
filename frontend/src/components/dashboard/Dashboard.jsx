import React, { Component } from "react";

import Sidebar from "../sidebar/sidebar";

import Footer from '../layout/Footer'

// import "../../styles.scss";

export class Dashboard extends Component {
  render() {
    return (
      <div id="dashboard" className="body">
        <Sidebar>{this.props.children}</Sidebar>
        <Footer/>
      </div>
    );
  }
}

export default Dashboard;
