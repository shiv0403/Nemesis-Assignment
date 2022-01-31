import {
  LOGIN_FAILURE,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT_SUCCESS,
} from "../actions/authActionsTypes";

import jwtDecode from "jwt-decode";

const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  email: "",
  id: "",
  err: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
    case LOGIN_SUCCESS:
      const user = jwtDecode(action.payload);
      return {
        ...state,
        loading: false,
        email: user.email,
        id: user.id,
        token: action.payload,
        error: {},
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        loading: false,
        token: null,
        email: null,
        id: null,
      };
    default:
      return state;
  }
};

export default authReducer;
