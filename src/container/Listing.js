import React, { useState, useEffect, Fragment } from "react";
import Card from "./Card";
import Axios from "axios";
import Pagination from "./Pagination";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        // const res = await Axios.get(
        //   "http://127.0.0.1:8000/listinghouse/?page=1"
        // );
        const res = await Axios.get(
          "https://estate-real-appp.herokuapp.com/listinghouse/?page=1"
        );
        setListings(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const displayListing = () => {
    let cardListing = [];
    let result = [];
    listings.map((element) => {
      cardListing.push(
        <Card
          id={element.id}
          title={element.title}
          adress={element.adress}
          bathrooms={element.bathrooms}
          bedrooms={element.bedrooms}
          house_type={element.house_type}
          open_house={element.open_house}
          photo_main={element.photo_main}
          city={element.city}
          state={element.state}
          price={element.price}
          slug={element.slug}
          sqft={element.sqft}
          sale_type={element.sale_type}
        />
      );
    });
    for (let i = 0; i < listings.length; i += 3) {
      result.push(
        <Fragment>
          <div>{cardListing[i]}</div>
          {cardListing[i + 1] ? <div>{cardListing[i + 1]}</div> : null}
          {cardListing[i + 2] ? <div>{cardListing[i + 2]}</div> : null}
        </Fragment>
      );
    }

    return result;
  };

  const visitPage = (page) => {
    Axios.get(`https://estate-real-appp.herokuapp.com/listinghouse/?page=${page}`)
      .then((res) => {
        setListings(res.data.results);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setActive(page);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const previosPage = () => {
    Axios.get(previous)
      .then((res) => {
        setListings(res.data.results);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setActive(active - 1);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const nextPage = () => {
    Axios.get(next)
      .then((res) => {
        setListings(res.data.results);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        if (next) {
          setActive(active + 1);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="card__before__show">{displayListing()}</div>
      <section className="home__div__bottom__section">
        {listings.length != 0 ? (
          <Pagination
            count={count}
            visitingPage={visitPage}
            previousPage={previosPage}
            nextPage={nextPage}
            listingPerPage={3}
            active={active}
            updateListingPagination={visitPage}
          />
        ) : null}
      </section>
    </div>
  );
};
export default Listing;
