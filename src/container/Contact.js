import React, {  useState  } from "react";

import Axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    const mail = { name,
      email,
      subject,
      message};
    console.log("mailll", mail)
   Axios.post("https://estate-real-appp.herokuapp.com/contacts/mail/", mail  )
  //Axios.post("https://127.0.0.1:8000/contacts/mail/", mail  )
      .then((res) => {
        setSucces(true)
        alert(" E mail has been sent  sucessfully ",);
        setFormData({...formData,"name":"", "email":"","subject":"","message":""});
        
        console.log(res,"done");
        setLoading(false);
       
      })
      .catch((err) => {
        alert(err)
        console.log("eeror", err);
        setLoading(false);
        setError(true);
        
      });
  };
  return (

    <div>

      <Helmet>
        <title>Real Estate - Contact</title>
      </Helmet>
      <form
        className="contact__form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="contact__label__input">
          <label htmlFor="name">Full Name</label>
          <br></br>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => onChange(e)}
          ></input>
        </div>

        <div className="contact__label__input">
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="contact__label__input">
          <label htmlFor="subject">Subject</label>
          <br></br>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="contact__label__input">
          <label htmlFor="message">Message</label>
          <br></br>
          <textarea
            name="message"
            placeholder="Enter Message!"
            value={message}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        {error ? (<div style={"background:red"}> E mail could not be sent!</div>):null}

        { 
        loading ? (
           <div className="contact__label__input">
             <Loader type="Oval" height={50} width={50} color="turquoise" />
          </div>
        ) : (
          <div className="contact__label__input">
            <input
              className="contact__sendingButton"
              type="submit"
              value="Send"
            ></input>
          </div>
        )}
      </form>

      {console.log(formData)}
    </div>
  );
};

export default Contact;
