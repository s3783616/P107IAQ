import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

// Make a request to register a new user
export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response,
    });
  }
};

// Make a request to authorise login user information
export const login = (LoginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post("api/users/login", LoginRequest);
    // extract token from res.data
    if (res.data.token) {
      const { token } = res.data;
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      console.log(decoded);

      // dispatch to our securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    } else {
      localStorage.setItem("message", res.data.Message);
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Make a request to logout from account
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  //setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
