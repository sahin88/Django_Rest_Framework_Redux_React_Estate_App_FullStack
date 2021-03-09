import React, { Component } from "react";
import * as actions from "../actions/auth";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      username: null,
      password2: null,
      email: null,
      token: null,
      isAuthenticated: null,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitSignup = (event) => {
    event.preventDefault();
    this.props.authsignup(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.password2
    );
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <div className="login__div">
        <h2 className="login__div__h2">Sign up</h2>
        <p className="login__div__p">Create new Account!</p>
        <form className="login__div__form" onSubmit={this.submitSignup}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleSubmit}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleSubmit}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder=" Password"
              onChange={this.handleSubmit}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password2"
              placeholder=" Password Confirm"
              onChange={this.handleSubmit}
            ></input>
          </div>
          <div>
            <input type="submit" value="Sign Up"></input>
          </div>
        </form>
        <h6>
          Already have an Account <Link to="/login">Sign in</Link>
        </h6>
      </div>
    );
  }
}
const mapsDispatchToProps = (dispatch) => {
  return {
    authsignup: (username, email, password, password2) => {
      console.log(username, email, password, password2);
      dispatch(actions.signup(username, email, password, password2));
    },
  };
};

// export const signup = ({ username, email, password, password2 }) => async (
const mapsStateToProps = (state) => {
  return {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Signup);
