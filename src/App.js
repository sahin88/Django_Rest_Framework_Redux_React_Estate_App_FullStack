import React, { Component } from "react";

import Layout from "./hocs/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./container/Home";
import About from "./container/About";
import Contact from "./container/Contact";
import Signup from "./container/Signup";
import Login from "./container/Login";
import ListingDetail from "./container/ListingDetail";
import Listing from "./container/Listing";
// import "./sass/main.scss";
import "./App.css";
import NotFound from "./container/NotFound";

import ProtectedRoute from "./container/ProtectedRoutes";
import { connect, Provider } from "react-redux";
import * as actions from "./actions/auth";
import store from "./store";
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute
                  path="/listings/:id"
                  component={ListingDetail}
                />
                {/* <Route path="/listings/:id" component={ListingDetail} /> */}
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/list" component={Listing} />
                <Route exact path="/listings" component={ListingDetail}></Route>
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </Router>
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispathc) => {
  return {
    login: dispathc(actions.login()),
  };
};
const mapsStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(App);
