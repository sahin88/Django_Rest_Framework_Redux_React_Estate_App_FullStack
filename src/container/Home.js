import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ListingForm from "./ListingForm";
import Listingss from "./Listingss";
import Pagination from "./Pagination";
// var indexOfLastListing;
// var indexOfFirstListing;
// var actualListing;

//
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      listingPerPage: 3,
      active: 1,
      listing: [],
      indexOfLastListing: 0,
      indexOfFirstListing: 0,
      actualList: [],
    };
  }
  visitingPage = (page) => {
    this.setState({ currentPage: page, activave: page });
  };

  updateListingPagination = (data) => {
    this.setState({
      active: data,
      currentPage: data,
    });
    let indexOfLastListing = data * this.state.listingPerPage;
    let firstIndexNumber = indexOfLastListing - this.state.listingPerPage;

    var items = this.state.listing.slice(firstIndexNumber, indexOfLastListing);

    this.setState({
      actualList: items,
    });
  };

  updateListing = (data) => {
    this.setState({ listing: data });
    let indexOfLastListing = this.state.currentPage * this.state.listingPerPage;
    let firstIndexNumber = indexOfLastListing - this.state.listingPerPage;

    var items = this.state.listing.slice(firstIndexNumber, indexOfLastListing);

    this.setState({
      actualList: items,
    });
  };

  previousPage = () => {
    let oldState = { ...this.state };
    if (oldState.currentPage !== 1) {
      this.setState({
        currentPage: oldState.currentPage - 1,
        active: oldState.currentPage - 1,
      });
    }

    let indexOfLastListing =
      (this.state.currentPage - 1) * this.state.listingPerPage;
    let firstIndexNumber = indexOfLastListing - this.state.listingPerPage;

    var items = this.state.listing.slice(firstIndexNumber, indexOfLastListing);

    this.setState({
      actualList: items,
    });
  };
  nextPage = () => {
    let oldState = { ...this.state };
    if (
      oldState.currentPage !==
      Math.ceil(this.state.listing.length / this.state.listingPerPage)
    ) {
      this.setState({
        currentPage: oldState.currentPage + 1,
        active: oldState.currentPage + 1,
      });
    }

    let indexOfLastListing =
      (this.state.currentPage + 1) * this.state.listingPerPage;
    let firstIndexNumber = indexOfLastListing - this.state.listingPerPage;

    var items = this.state.listing.slice(firstIndexNumber, indexOfLastListing);

    this.setState({
      actualList: items,
    });
  };

  render() {
    return (
      <div className="home__div">
        <input
          type="hidden"
          value={this.state.listing}
          onChange={this.changingValue}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home || Estate APP</title>
        </Helmet>
        <section className="home__div__top__section">
          <ListingForm updateListing={this.updateListing} />
        </section>
        <section className="home__div__middle__section">
          <Listingss listing={this.state.actualList} />
        </section>
        <section className="home__div__bottom__section">
          {this.state.listing.length !== 0 ? (
            <Pagination
              count={this.state.listing.length}
              visitingPage={this.visitingPage}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
              listingPerPage={this.state.listingPerPage}
              currentPage={this.state.currentPage}
              active={this.state.active}
              listing
              updateListingPagination={this.updateListingPagination}
            />
          ) : null}
        </section>
      </div>
    );
  }
}

export default Home;
