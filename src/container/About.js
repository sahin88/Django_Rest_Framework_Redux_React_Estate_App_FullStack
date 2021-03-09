import React, {useState, useEffect } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

//frontend/src/container/estate_1.jpg
const About = () => {
  const [realtors, setRealTors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      Axios.defaults.header = {
        "Content-Type": "application/json",
      };
      try {
        const res = await Axios.get("https://estate-real-appp.herokuapp.com/immobilien/");
        //const res = await Axios.get("http://127.0.0.1:8000/immobilien/");
        setRealTors(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const displayData = () => {
    let display = [];

    realtors.map((realtor) => {
      return display.push(
        <div className="about__realtors">
          <div>
            <img className="about__realtors__img" src={realtor.photo} alt="real_tors" />
          </div>
          <div className="about__realtors__div" >
            <h2>{realtor.name}</h2>
          </div>
          <div className="about__realtors__p">
            <p>{realtor.email}</p>
          </div>
          <div className="about__realtors__p">
            <p>{realtor.phone}</p>
          </div>
          <div className="about__realtors__div">
            <p>{realtor.description}</p>
          </div>
        </div>
      );
    });

    return display;
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home || Estate APP</title>
      </Helmet>
      <div className="realtor__meet__div">
        <h2 className="realtor__meet">We sell your estate!</h2>
      </div>
      <div className="about__realtors__imgp">
        <img className="about__realtors__mainimg" src="https://estate-real-appp.herokuapp.com/build/estate_1.jpg"  alt="real_tors"/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="realtor__meet__div">
        <h2 className="realtor__meet">Meet with our Team!</h2>
      </div>
      <div className="about__realtors__info">{displayData()}</div>
    </div>
  );
};

export default About;
//frontend/public
