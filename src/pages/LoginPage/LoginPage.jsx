import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormLabel from "../../components/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import qr2 from '../../images/QR.png';
import "./login.css";

export default function LoginPage() {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      // headers
      console.log(res.headers.get('uid'))
      console.log(res.headers.get('access-token'))
      console.log(res.headers.get('expiry'))
      console.log(res.headers.get('client'))

      const data = await res.json()
      console.log(data)

      if(res.status === 200){
      navigate('/m');
      }
      else {
        navigate('/')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="position">
      <div className="container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-header">
            <span className="primary-header">Welcome back! </span> <br />
            <span className="secondary-header">
              We're so excited to see you again!
            </span>
          </div>

          <FormLabel label={"EMAIL ADDRESS"} />
          <Input
            className={"input-field"}
            name="email"
            value={emailValue}
            type="email"
            onChange={handleChange}
          />

          <FormLabel label={"PASSWORD"} />
          <Input
            className={"input-field"}
            name="password"
            value={passwordValue}
            type="password"
            onChange={handleChange}
          />

          <Link className="forgot-pw" to={'/test'}>
            Forgot your password?
          </Link>

          <Button className={"login-btn"} text={"Login"} />

          <span className="register">
            Need an account? <Link to={'/signup'}> Register </Link>
          </span>
        </form>

        <div className="qr-cont">
          <img src={qr2} className="qr-code" alt="QR Code" />
          <h4> Log in with QR code </h4>
          <span className="mobile-app">
            Scan this with the Thiscord mobile app to log in instantly.
          </span>
        </div>
      </div>
    </div>
  );
}
