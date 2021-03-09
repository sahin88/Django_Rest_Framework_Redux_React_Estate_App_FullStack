import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
export class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sale_type: "For Sale",
      price: "$0+",
      bedrooms: "0+",
      house_type: "House",
      sqft: "1000+",
      days_listed: "1 or less",
      has_photos: "1+",
      open_house: false,
      bathrooms: "0+",
      keywords: "",
      loading: false,
    };
  }
  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  settingList = (data) => {
    this.props.updateListing(data.data);

    window.scrollTo(0, 0);
  };

  formSubmit = (event) => {
    event.preventDefault();
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    var formData = this.state;
    delete formData.loading;

    this.setState({
      loading: true,
    });
    axios
      .post("https://estate-real-appp.herokuapp.com/listinghouse/search/", formData)
      .then((res) => {
        console.log("giden",formData)
        this.settingList(res);
        console.log("ben bu konuda kitap yazdim kitabin icerigi cahaz ve hazzim  tarin",res.data)
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        alert("Error  : "+err)
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <div className="home__div__top">
        <form
          className="home__div__top__section__form"
          onSubmit={this.formSubmit}
        >
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="sqft">Sqft</label> <br/>
              <select
                onChange={this.formChange}
                name="sqft"
                value={this.state.sqft}
              >
                <option>1000+</option>
                <option>1200+</option>
                <option>1500+</option>
                <option>1700+</option>
                <option>2000+</option>
                <option>Any</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="sale_type">Sale Type</label><br/>
              <select
                onChange={this.formChange}
                name="sale_type"
                value={this.state.sale_type}
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="price">Minumum Price</label><br/>
              <select
                onChange={this.formChange}
                name="price"
                value={this.state.price}
              >
                <option>$200,000+</option>
                <option>$400,000+</option>
                <option>$600,000+</option>
                <option>$800,000+</option>
                <option>$1,000,000+</option>
                <option>$1,200,000+</option>
                <option>$1,500,000+</option>
                <option>Any</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="days_listed">Days Listed</label> <br/>
              <select
                onChange={this.formChange}
                name="days_listed"
                value={this.state.days_listed}
              >
                <option>1 or less </option>
                <option>2 or less </option>
                <option>5 or less </option>
                <option>10 or less </option>
                <option>20 or less </option>
                <option>Any</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="bedrooms">Bedrooms</label> <br/>
              <select
                onChange={this.formChange}
                name="bedrooms"
                value={this.state.bedrooms}
              >
                <option>0+</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="has_photos">Has Photos</label> <br/>
              <select
                onChange={this.formChange}
                name="has_photos"
                value={this.state.has_photos}
              >
                <option>0+</option>
                <option>1+</option>
                <option>3+</option>
                <option>5+</option>
                <option>10+</option>
                <option>15+</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="home_type">Home Type</label><br/>
              <select
                onChange={this.formChange}
                name="house_type"
                value={this.state.house_type}
              >
                <option>House</option>
                <option>Conda</option>
                <option>Townhouse</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="bathrooms">Bathrooms</label><br/>
              <select
                onChange={this.formChange}
                name="bathrooms"
                value={this.state.bathrooms}
              >
                <option>0+</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="keywords">Keywords</label> <br/>
              <input
                type="text"
                onChange={this.formChange}
                name="keywords"
                value={this.state.keywords}
              ></input>
            </div>
            <div className="home__div__top__section__form__div__div">
              <label htmlFor="open_house">Open House</label> <br/>
              <input
                type="checkbox"
                onChange={this.formChange}
                name="open_house"
                value={this.state.open_house}
              ></input>
            </div>
            
                  {this.state.loading ? (
                    <div className="home__div__top__section__form__div__div">
                  <Loader type="Oval" width={50} height={50} color={"turquoise"} />
                  </div>
                ) : (
                  <div className="home__div__top__section__form__div__div">
                  <br></br>
                  <input type="submit" value="Submit" />
                  </div>
                )}
            


         
        </form>
      </div>
    );
  }
}

export default ListingForm;
