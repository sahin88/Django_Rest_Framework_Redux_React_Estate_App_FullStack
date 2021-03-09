import {
  SIGNUP_SUCESS,
  SIGNUP_FAIL,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCESS:
      localStorage.setItem("token", payload.tokens.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload.tokens.token,
      };
    case SIGNUP_SUCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
}
