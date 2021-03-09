import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

const ListingDetail = (props) => {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);
  const numberwithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    const slug = props.match.params.id;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    Axios.get(`https://estate-real-appp.herokuapp.com/listinghouse/${slug}/`, config)
      .then((res) => {
        setListing(res.data);
        setPrice(numberwithCommas(res.data.price));
      })
      .catch((error) => {
        console.log("errororoor", error);
      });
  }, [props.match.params.id]);
  console.log("listing", listing, listing.imobile);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const id = listing.imobile;
    if (id) {
      Axios.get(`https://estate-real-appp.herokuapp.com/immobilien/${id}/`, config)
        .then((res) => {
         
          setRealtor(res.data);
         
        })
        .catch((err) => {
         alert("Error  :  "+err);
        });
    }
  }, [listing.imobile]);
  const showImage = () => {
    let listingOfphotos = [];
    for (let i = 1; i < 21; i += 1) {
      if (listing[`photo_${i}`]) {
        listingOfphotos.push(
          <div className="listings__div">
            <img className="listings__div__img" src={listing[`photo_${i}`]} alt="img_home"/>
          </div>
        );
      }
    }
    return listingOfphotos;
  };
  return (
    <div className="listindetail">
      <Helmet>
        <title>Real Estate-Listing |{`${listing.title}`}</title>
        <meta name="description" content="Listing detail" />
      </Helmet>
      <div className="listingdetail__header">
        <h1 className="listingdetail__title">{listing.title}</h1>
        <p className="listingdetail__location">
          {listing.city}, {listing.state},{listing.zipcode}
        </p>
      </div>
      <div className="listingdetail__header__sub">
        {listing.house_type}/{listing.zipcode}
      </div>
      <div className="listingdetail__main__top">
        <div className="listingdetail__main__top__left">
          <div className="listingdetail__mainphoto">
            <img
              src={listing.photo_main}
              className="listingdetail__mainphoto__img" alt="img_home"
            />
          </div>
          <div className="listingdetail__info">
            <div className="listingdetail__info__div">
              <p className="card__info">Price: ${price}</p>
              <p className="card__info">Bedrooms: {listing.bedrooms}</p>
              <p className="card__info">Bathrooms: {listing.bathrooms}</p>
            </div>
            <div className="listingdetail__info__div">
              <p className="card__saletype"> {listing.sale_type}</p>
              <p className="card__hometype"> {listing.house_type}</p>
              <p className="card__sqft">Sqft: {listing.sqft}</p>
            </div>
          </div>
        </div>
        <div className="listingdetail__realtor">
          <div className="listingdetail__realtor__divimg">
            <img src={realtor.photo} className="listingdetail__realtor__img" alt="img_home" />
          </div>

          <div className="listingdetail__realtor__info">
            <h2 className="listingdetail__realtor__info__h2">{realtor.name}</h2>
            <p className="listingdetail__realtor__info__p">{realtor.phone}</p>
            <p className="listingdetail__realtor__info__p">
              {realtor.description}
            </p>
          </div>
        </div>
      </div>
      <div className="subphotos">{showImage()}</div>
    </div>
  );
};

export default ListingDetail;
