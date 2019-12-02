import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

// import MenuIcon from "@material-ui/icons/Menu";

import "./header.styles.scss";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleClick() {
    return <Redirect to="/login" />;
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(`auth properties`, this.props.auth);

    const authLinks = (
      // <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      //   <li className="nav-item">
      //     <Link to="/login" className="nav-link">
      //       <button
      //         className="nav-link btn btn-primary btn-sm text-light"
      //         onClick={this.props.logout}
      //       >
      //         Logout
      //       </button>
      //     </Link>
      //   </li>
      // </ul>

      <Link
        to="/login"
        className="nav-link"
        onClick={() => {
          this.handleClick();
          this.props.logout();
        }}
      >
        Logout
      </Link>
    );

    /* const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    ); */

    return (
      <div id="dashboard" className="body">
        <nav className="header navbar navbar-expand-sm navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="#">
              {isAuthenticated ? "Welcome" : "Login"}
            </Link>
          </div>
          <div className="profile-area">
            <div className="profile-info">
              <p style={{ marginTop: ".6rem" }}>
                <span className="profile-name">{user}</span>
                {isAuthenticated ? (
                  <span className="profile-status">{"Admin"}</span>
                ) : (
                  ""
                )}
                <br />
                {isAuthenticated ? authLinks : ""}
              </p>
            </div>
            {isAuthenticated ? <div className="profile-img"></div> : ""}
          </div>
        </nav>
      </div>
      // <nav className="navbar navbar-expand-sm navbar-light bg-light">
      //   <div className="container">
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#navbarTogglerDemo01"
      //       aria-controls="navbarTogglerDemo01"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      //       <Link className="navbar-brand" to="#">
      //         {isAuthenticated ? "Welcome" : "Login"}
      //       </Link>
      //     </div>
      //     {user}
      //     {isAuthenticated ? authLinks : guestLinks}
      //   </div>
      // </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
