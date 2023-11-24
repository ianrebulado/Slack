import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormLabel from "../../components/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import qr2 from '../../images/qr.png';
import { Slack } from "../../utils/axios";

import "./login.css";

export default function LoginPage() {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const payload = {
    email: emailValue,
    password: passwordValue
  }

  // handle change
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  
  // handle submit
  async function handleSubmit(e){
    e.preventDefault();
  try {
    const res = await Slack.post('/auth/sign_in', payload)
    
    
      const token = res.headers.get('access-token');
      const uid = res.headers.get('uid');
      const expiry = res.headers.get('expiry');
      const client = res.headers.get('client');
      const id = res.data.data.id
    
      Slack.defaults.headers['access-token'] = token;
      Slack.defaults.headers['uid'] = uid;
      Slack.defaults.headers['expiry'] = expiry;
      Slack.defaults.headers['client'] = client;

      localStorage.setItem('token', token)
      localStorage.setItem('uid', uid)
      localStorage.setItem('expiry', expiry)
      localStorage.setItem('client', client)
      localStorage.setItem('id', id )

        if(res.status === 200){
        navigate('/m');
        } else {
          console.log('Error')
          localStorage.clear()
          navigate('/')
        }
} catch (error) {
  console.error(error)
}
}


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
