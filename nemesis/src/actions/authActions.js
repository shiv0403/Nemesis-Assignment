import axios from "../api/axios";
import {
  LOGIN_FAILURE,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./authActionsTypes";
import { useNavigate } from "react-router-dom";

const authLoading = () => {
  return {
    type: AUTH_LOADING,
  };
};

const signupLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const signupLoginFailed = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch(authLoading());

    await axios
      .post("/api/auth/login", { email: data.email, password: data.password })
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        window.location = "http://localhost:3000";
        dispatch(signupLoginSuccess(token));
      })
      .catch((err) => {
        data.setOpen(true);
        data.setErrors(err.response.data);
        dispatch(signupLoginFailed(err));
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await axios.get("/api/auth/logout").then((res) => {
      dispatch(logoutSuccess());
      const data = res.data;
      console.log(data.msg);
    });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        payload: token,
      });
    } else {
      return null;
    }
  };
};
