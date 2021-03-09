
import axios from "axios";
import {
  SIGNUP_SUCESS,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    // };
    const res = await axios.post(
      "https://estate-real-appp.herokuapp.com/account/login/",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    alert(" has beeen done ");

    // dispatch({
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    console.log("it  has not been submitted");
    console.log("error", err);
    // dispatch({
  }
};

export const signup = (username, email, password, password2) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password, password2 });
  console.log("signup body", body);
  try {
    const res = await axios.post(
      "https://estate-real-appp.herokuapp.com/account/register/",
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });

    dispatch(login(email, password));
  } catch (err) {
    console.log("error", err);
    // dispatch({
    //   type: SIGNUP_FAIL,
    // });
    // dispatch(setAlert("Error", err));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  await axios
    .post("https://estate-real-appp.herokuapp.com/account/logout/")
    .then((res) => {
      console.log("asker");
    })
    .catch((err) => {
      console.log("adem ");
    });

  dispatch({
    type: LOGOUT,
  });
};
