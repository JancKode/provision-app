import axios from "axios";
import { returnErrors } from "./messages";

import {
  /*USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,*/
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// CHECK TOKEN & LOAD USER
/*export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/login", tokenConfig(getState))
    .then(res => {
      console.log("res", res);
      if (!res.config.data.username || !res.config.data.password) {
        dispatch(returnErrors(res.config.data, res.conifg.data));
        dispatch({
          type: AUTH_ERROR
        });
      } else {
        dispatch({
          type: USER_LOADED,
          payload: res.config.data
        });
      }
    })
    .catch(err => {
      console.log(`err`, err);
      dispatch(returnErrors(err.response, err.response));
      dispatch({
        type: AUTH_ERROR
      });
    });
};*/

//Login user
export const login = (username, password) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ username, password });
  console.log(`body`, body);
  axios
    .post("/login", body, config)
    .then(res => {
      console.log(`res`, res);
      if (
        res.data.result === "No user found" ||
        res.data.result === "Invalid username or password"
      ) {
        dispatch(returnErrors(res.data.result, res.status));
        dispatch({
          type: LOGIN_FAIL
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      // console.log(`error login`, err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Register User

export const register = ({
  first_name,
  last_name,
  username,
  password,
  email
}) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    email
  });

  axios
    .post("/register", body, config)
    .then(res => {
      if (
        res.data.result === "User already exists" ||
        res.data.result === "Email already exists, please register a new one"
      ) {
        dispatch(returnErrors(res.data.result, res.status));
        dispatch({
          type: REGISTER_FAIL
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//helper function related to setting up config token
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
