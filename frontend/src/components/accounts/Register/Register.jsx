import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../../actions/auth";
import { createMessage } from "../../../actions/messages";
import { withAlert } from "react-alert";
import { compose } from "redux";


import "./Register.styles.scss";

export class Register extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password2
    } = this.state;
    const { alert } = this.props;

    // console.log("register[error]", error);
    if (!username) {
      this.props.createMessage({
        validateUsername: "Username should not be blank"
      });
    }
    if (!email) {
      this.props.createMessage({ validateEmail: "Email should not be blank" });
    }
    if (password !== password2) {
      // this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
      this.props.alert.error("Passwords do not match");
    } else {
      const newUser = {
        first_name,
        last_name,
        username,
        password,
        email,
        alert
      };
      this.props.register(newUser);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password2
    } = this.state;
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
        <div id="register" className="register">
        <div className="bg"></div>
        <div className="register-containter">
          {/* <div className="logo">
            <img
              alt="profile logo"
              src={require("../../../assets/images/logo2x.png")}
            />
          </div> */}

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
              type="text"
              className="form-control"
              name="first_name"
              onChange={this.onChange}
              value={first_name}
              required
              placeholder="First Name"
            />
            <input
              type="text"
              className="form-control"
              name="last_name"
              onChange={this.onChange}
              value={last_name}
              required
              placeholder="Last Name"
            />

            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={email}
              required
              placeholder="Email"
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
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={this.onChange}
              value={password2}
              placeholder="Repeat password"
            />
            <button type="submit" className="btn btn-blue btn-register">
              Register
            </button>
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="link"
                style={{ textDecoration: "none", fontSize: "16px" }}
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors
});

export default compose(
  withAlert(),
  connect(mapStateToProps, { register, createMessage })
)(Register);
