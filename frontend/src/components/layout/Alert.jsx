import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAlert} from 'react-alert';
import { compose } from "redux";

export class Alert extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;

    if (message !== prevProps.error.msg) {
      if (
        error.msg === "User already exists" ||
        error.msg === "Invalid username or password" ||
        error.msg === "No user found" ||
        error.msg === "Email already exists, please register a new one"
      ) {
        this.props.alert.error(error.msg);
      } else if (message.passwordNotMatch) {
        this.props.alert.error(message.passwordNotMatch);
      } 
    } else {
      setTimeout(() => {
        this.props.alert.success(`Welcome back!`)
      }, 600)
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default compose(
  withAlert(),
  connect(mapStateToProps)
)(Alert);
