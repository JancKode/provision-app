import React, { Component } from "react";
import { createStructuredSelector } from "reselect";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";
import { authProperties } from "../../reducers/auth.selector";

// import MenuIcon from "@material-ui/icons/Menu";

import { ToggleBarButton } from "../toggle-button/toggle-button.component";

import {
  NavBar,
  ProfileArea,
  ProfileInfo,
  ProfileName,
  ToggleBar,
  ProfileWrapper,
  InitialsWrapper
} from "./header.styles.jsx";

import "./header.styles.scss";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleClick() {
    return <Redirect to="/login" />;
  }
  render() {
    const { isAuthenticated, first_name, last_name } = this.props.auth;
    let initials;
    console.log(`auth properties`, this.props.auth);

    if(isAuthenticated){
      initials = `${first_name.charAt(0)}${last_name.charAt(0)}`;
    } else {
      initials = process.env.REACT_APP_STAGE === "mock" ? "TU" : "";
    }
    
    

    const authLinks = (
      <Link
        to="/login"
        className="link link-logout"
        // className="nav-link"
        onClick={() => {
          this.handleClick();
          this.props.logout();
        }}
      >
        Logout
      </Link>
    );

    return (
      <NavBar className={isAuthenticated ? "authenticated" : "logout"}>
        <div>
          <ToggleBarButton />
          <Link id="welcomeLink" className="link" to="#">
            {isAuthenticated ? "Welcome" : "Login"}
          </Link>
        </div>
        <ProfileArea>
          <ProfileInfo className="profile-info">
            <ProfileName className="profile-name">{`${first_name} ${last_name}`}</ProfileName>
            {isAuthenticated ? (
              <span className="profile-status">{"Admin"}</span>
            ) : (
              ""
            )}
            <br />
            {isAuthenticated ? authLinks : ""}
            {isAuthenticated ? <ProfileWrapper>
            <InitialsWrapper>{initials}</InitialsWrapper>
          </ProfileWrapper> : ""}
          </ProfileInfo>
         
        </ProfileArea>
      </NavBar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  auth: authProperties,
});

export default connect(mapStateToProps, { logout })(Header);
