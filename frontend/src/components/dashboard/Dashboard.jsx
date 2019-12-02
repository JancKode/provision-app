import React, { Component } from "react";

import Sidebar from "../sidebar/sidebar";

import "../../styles.scss";

export class Dashboard extends Component {
  render() {
    return (
      <div id="dashboard" className="body">
        <Sidebar>{this.props.children}</Sidebar>
      </div>
    );
  }
}

export default Dashboard;
