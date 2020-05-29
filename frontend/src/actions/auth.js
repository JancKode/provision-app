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

//check environment
const appSTage = process.env.REACT_APP_STAGE;

console.log(`appSTage`, appSTage);

//Login user
export const login = (username, password, alert) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request Body
  const body = JSON.stringify({ username, password });

  if (appSTage === "dev") {
    axios
      .post("/login", body, config)
      .then((res) => {
        console.log(`res`, res);
        if (
          res.data.result === "No user found" ||
          res.data.result === "Invalid username or password"
        ) {
          dispatch(returnErrors(res.data.result, res.status));
          dispatch({
            type: LOGIN_FAIL,
          });
        } else {
          alert.success(`Welcome back ${res.data.first_name}!`);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(`error login1123`, err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  } else if (appSTage === "mock") {
    axios
      .get("https://d05ea3e3-649a-4145-b292-c4ed31dc6ab6.mock.pstmn.io/login")
      .then((res) => {
        console.log(`res axios`, res);
        alert.success(`Welcome back ${res.data.first_name}!`);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  }
};

//Register User

export const register = ({
  first_name,
  last_name,
  username,
  password,
  email,
  alert,
}) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request Body
  const body = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    email,
  });

  axios
    .post("/register", body, config)
    .then((res) => {
      if (
        res.data.result === "User already exists" ||
        res.data.result === "Email already exists, please register a new one"
      ) {
        alert.error(res.data.result);
        dispatch(returnErrors(res.data.result, res.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      } else {
        alert.success(`Registered successfully`);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      alert.error(err.response.status);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//Logout user


export const logout = () => (dispatch, getState) => {
   if (appSTage === "dev") {
      axios
        .post("/logout", null, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    } else if (appSTage === "mock") {
      axios
        .get("https://d05ea3e3-649a-4145-b292-c4ed31dc6ab6.mock.pstmn.io/logout", null, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    }
};

//helper function related to setting up config token
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
