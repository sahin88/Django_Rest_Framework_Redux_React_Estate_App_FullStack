import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
    };
  }

  logout = (event) => {
    this.props.authlogout();
    event.preventDefault();
    window.location.reload(false);
  };

  normal = (
    <div className="fragment">
      <Link className="link" to="/login">
        LOGIN
      </Link>
      <Link to="/login" className="link">
        SIGNUP
      </Link>
    </div>
  );
  auth = (
    <Fragment>
      <Link className="link" onClick={this.logout} to="/">
        Logout
      </Link>
    </Fragment>
  );

  render() {
    return (
      <Fragment>
        <nav className="navbar__header">
          <div>ESTATE APP</div>
          <div className="navbar__header__right__div">
            {localStorage.getItem("token") && !this.props.loading
              ? this.auth
              : this.normal}
          </div>
        </nav>
        <div className="navbar__header__bottom__div">
          <Link className="navbar__header__bottom__div__links" to="/">
            Home
          </Link>
          <Link className="navbar__header__bottom__div__links" to="/about">
            About
          </Link>
          <Link className="navbar__header__bottom__div__links" to="/list">
            Listing
          </Link>
          <Link className="navbar__header__bottom__div__links" to="/contact">
            Contact
          </Link>
        </div>
      </Fragment>
    );
  }
}
const mapsDispatchToProps = (dispatch) => {
  return {
    authlogout: () => {
      dispatch(actions.logout());
    },
  };
};

const mapsStateToProps = (state) => {
  return {
    token: state.token,
    loading: state.loading,
  };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Navbar);
