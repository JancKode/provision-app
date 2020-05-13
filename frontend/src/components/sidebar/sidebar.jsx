import React from "react";
import { Link } from "react-router-dom";

import Apps from "@material-ui/icons/Apps";
import Bag from "@material-ui/icons/LocalMallOutlined";

import {SideBarContainer,SideBar, SideBarNotif } from './sidebar.styles';

import './sidebar.styles.scss';

const Sidebar = props => {
  return (
    // <div className="container dashboard-content ">
    <SideBarContainer >
      {/* <div className="nav"> */}
      <SideBar>
        <ul>
          <li className="active">
            <Link
              to="/service-catalogue"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <span className="sideBarTitle">
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
              <span className="sideBarTitle">
                <Bag className="image" />
              </span>
              Orders and Status
            </Link>
            <SideBarNotif>
              <span id="sideBarNotif">3</span>
            </SideBarNotif>
            {console.log(`props.children`, props.children)}
            {/* <span className="nav-notif"> */}
            
          </li>
        </ul>
      {/* </div> */}
      </SideBar>
      {props.children}
    {/* </div> */}
    </SideBarContainer>
  );
};

export default Sidebar;
