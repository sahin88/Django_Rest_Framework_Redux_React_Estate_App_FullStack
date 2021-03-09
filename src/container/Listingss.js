import React, {  Fragment } from "react";
import Card from "./Card";

const Listingss = ({ listing }) => {
  const getListing = () => {
    let result = [];
    let cardListing = [];
    listing.map((element) => {
      cardListing.push(
        <Card
          id={element.id}
          title={element.title}
          adress={element.adress}
          bathrooms={element.bathrooms}
          bedrooms={element.bedrooms}
          house_type={element.house_type}
          open_house={element.open_house}
          photo_main={`https://estate-real-appp.herokuapp.com${element.photo_main}`}
          city={element.city}
          state={element.state}
          price={element.price}
          slug={element.slug}
          sqft={element.sqft}
          sale_type={element.sale_type}
        />
      );
    });
    for (let i = 0; i < listing.length; i += 3) {
      return (
        <Fragment>
          <div>{cardListing[i]}</div>
          {cardListing[i + 1] ? <div>{cardListing[i + 1]}</div> : null}
          {cardListing[i + 2] ? <div>{cardListing[i + 2]}</div> : null}
        </Fragment>
      );
    }

    return result;
  };
  return <div className="card__before__show">{getListing()}</div>;
};

export default Listingss;

// export class Listingss extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       listing: [],
//       cards: [],
//       results: [],
//     };
//   }
//   consistOfCard = () => {
//     if (this.state.listing.length > 0) {
//       this.setState({
//         listing: [],
//       });
//     }
//   };

//   settingLists = (event) => {
//     console.log("*********************************++data", this.props.listing);
//     return this.setState({ listing: this.props.listing });
//   };

//   controlFunc = () => {
//     console.log("cardss", this.state.cards);
//     for (let i = 0; i < this.props.listing.length; i += 3) {
//       return (
//         <div>
//           <div>{this.state.cards[i]}</div>
//           {this.state.cards[i + 1] ? (
//             <div>{this.state.cards[i + 1]}</div>
//           ) : null}
//           {this.state.cards[i + 2] ? (
//             <div>{this.state.cards[i + 2]}</div>
//           ) : null}
//         </div>
//       );
//     }
//   };
//   componentDidMount() {
//     console.log("*******************aynur_abla_gelmesi", this.props);
//   }
//   componentDidUpdate(newProps, prevProps) {
//     console.log(
//       "++++++++++++++++++++++++ynur_abla_gelmesi",
//       this.props.listing,
//       newProps,
//       prevProps
//     );

//     if (this.state.cards.length !== 0) {
//       this.setState({
//         cards: [],
//       });
//     }
//   }
//   render() {
//     return (
//       <div>
//         {/* <input
//           type="hidden"
//           value={this.state.listing}
//           onLoad={this.settingLists()}
//         />
//         {/* {this.settingLists()} */}
//         {/* {this.consistOfCard()} */}

//         {this.props.listing.map((element) => {
//           this.state.cards.push(
//             <Card
//               id={element.id}
//               title={element.title}
//               adress={element.adress}
//               bathrooms={element.bathrooms}
//               bedrooms={element.bedrooms}
//               house_type={element.house_type}
//               open_house={element.open_house}
//               photo_main={element.photo_main}
//               city={element.city}
//               state={element.state}
//               price={element.price}
//               slug={element.slug}
//               sqft={element.sqft}
//               sale_type={element.sale_type}
//             />
//           );
//         })}
//         {this.controlFunc()}
//       </div>
//     );
//   }
// }
