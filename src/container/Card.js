import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = (props) => {
  const numberwithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="card">
      <h3 className="card__title">{props.title}</h3>
      <div className="card__header">
        {console.log("haddini asan", props.photo_main)}
        <img
          className="card__header__photo"
          src={props.photo_main}
          alt="House"
        />
      </div>
      <p className="card__location">
        {props.adress},{props.city},{props.state}
      </p>
      <div className="card__info__info">
        <div className="card__info__info__group">
          <p className="card__info">Price: ${numberwithCommas(props.price)}</p>
          <p className="card__info">Bedrooms: {props.bedrooms}</p>
          <p className="card__info">Bathrooms: {props.bathrooms}</p>
        </div>
        <div className="card__info__info__group">
          <p className="card__saletype"> {props.sale_type}</p>
          <p className="card__hometype"> {props.house_type}</p>
          <p className="card__sqft">Sqft: {props.sqft}</p>
        </div>
      </div>
      <Link className="card__link" to={`/listings/${props.slug}`}>
        ViewLIsting
      </Link>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  photo_main: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathrooms: PropTypes.string.isRequired,
  sale_type: PropTypes.string.isRequired,
  house_type: PropTypes.string.isRequired,
  sqft: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Card;
