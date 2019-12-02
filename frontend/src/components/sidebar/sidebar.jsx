import React from "react";
import { Link } from "react-router-dom";

import Apps from "@material-ui/icons/Apps";
import Bag from "@material-ui/icons/LocalMallOutlined";

const Sidebar = props => {
  return (
    <div className="container dashboard-content">
      <div className="nav">
        <ul>
          <li className="active">
            <Link
              to="/service-catalogue"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <span>
                <Apps className="image" />
              </span>
              Service Catalogue
            </Link>
          </li>
          <li>
            <Link
              to="/order-status"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <span>
                <Bag className="image" />
              </span>
              Orders and Status
            </Link>
            <span className="nav-notif">
              <span>3</span>
            </span>
          </li>
        </ul>
      </div>
      {props.children}
    </div>
  );
};

export default Sidebar;
