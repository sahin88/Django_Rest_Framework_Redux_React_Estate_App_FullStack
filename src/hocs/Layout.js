import React, { Component } from "react";
import Navbar from "../component/Navbar";

export class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
