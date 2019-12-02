import React from "react";
import { Link, Route } from "react-router-dom";

import AppsIcon from "@material-ui/icons/Apps";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";

// import "./sidebar.styles.scss";

const SidebarWrapper = () => {
  return (
    <div class="container dashboard-content">
      <div className="nav">
        <ul>
          <li className="active">
            <Link to="/service-catalogue">
              <AppsIcon
                className="material-icons"
                style={{ fontSize: "32px" }}
              />
              Service Catalog
            </Link>
          </li>
          <li className="side-nav__item">
            <Link to="/order" className="side-nav__link">
              <LocalMallOutlinedIcon
                className="material-icons"
                style={{ fontSize: "32px" }}
              />
              Order and Status
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarWrapper;
