import React, { Component } from "react";

export class NotFound extends Component {
  render() {
    return (
      <div className="notFound">
        <h2 className="notFound__heading">Not Found </h2>
        <p className="notFound__paragraph">THe page you search for not found</p>
      </div>
    );
  }
}

export default NotFound;
