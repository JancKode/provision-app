import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose} from 'redux';
import { withAlert} from 'react-alert'
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";

import {WithSpinner} from '../../with-spinner/with-spinner.compoent';


import { Fragment } from "react";

import "./Login.styles.scss";

export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onSubmit(e) {
    const {username, password} = this.state;
    const { alert } = this.props;
    e.preventDefault();
    this.props.login(username, password, alert);
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log(`login props`, this.props)
    if (this.props.isAuthenticated) {
      return <Redirect to="/service-catalogue" />;
    }
    const { username, password } = this.state;
    return (
      <div id="login" className="login">
        
        <div className="bg"></div>
        <div className="login-containter">
          <div className="logo">
            <img
              alt="profile logo"
              src={require("../../../assets/images/logo2x.png")}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.onChange}
              value={username}
              required
              placeholder="Username"
            />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password}
              required
              placeholder="Password"
            />
            <button type="submit" className="btn btn-blue btn-login">
              LOGIN
            </button>
            <p style={{ marginTop: "10px" }}>
              <Link
                to="#"
                className="link"
                style={{
                  textDecoration: "none",

                  fontSize: "16px"
                }}
              >
                Forgot Password
              </Link>
            </p>
            <div className="divider"></div>
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="link"
                style={{ textDecoration: "none", fontSize: "16px" }}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      // <div classNameName="col-md-6 m-auto">
      //   <div classNameName="card card-body mt-5">
      //     <h2 classNameName="text-center">Login</h2>
      //     <form onSubmit={this.onSubmit}>
      //       <div classNameName="form-group">
      //         <label>Username</label>
      //         <input
      //           type="text"
      //           classNameName="form-control"
      //           name="username"
      //           onChange={this.onChange}
      //           value={username}
      //           required
      //         />
      //       </div>

      //       <div classNameName="form-group">
      //         <label>Password</label>
      //         <input
      //           type="password"
      //           classNameName="form-control"
      //           name="password"
      //           onChange={this.onChange}
      //           value={password}
      //           required
      //         />
      //       </div>

      //       <div classNameName="form-group">
      //         <button type="submit" classNameName="btn btn-primary">
      //           Login
      //         </button>
      //       </div>
      //       <p>
      //         Don't have an account? <Link to="/register">Register</Link>
      //       </p>
      //     </form>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors
});

export default compose(
  withAlert(),
  connect(mapStateToProps, { login })
  )(Login);
