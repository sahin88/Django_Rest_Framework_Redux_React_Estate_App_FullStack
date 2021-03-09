import React, { Component } from "react";
import * as actions from "../actions/auth";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
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

  submitLogin = (event) => {
    event.preventDefault();
    this.props.authlogin(this.state.email, this.state.password);
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <div className="login__div">
        <h2 className="login__div__h2">Login</h2>
        <p className="login__div__p">Sign in your Account!</p>
        <form className="login__div__form" onSubmit={this.submitLogin}>
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
            <input type="submit" value="submit"></input>
          </div>
        </form>
        <h6>
          Don't have any account yet <Link to="/signup">Sign in</Link>
        </h6>
      </div>
    );
  }
}
const mapsDispatchToProps = (dispatch) => {
  return {
    authlogin: (email, password) => {
      dispatch(actions.login(email, password));
    },
  };
};

const mapsStateToProps = (state) => {
  return {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Login);
