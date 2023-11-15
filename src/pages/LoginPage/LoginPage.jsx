import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormLabel from "../../components/FormLabel";
import { Link } from "react-router-dom";
import test from "../Test/testpage";
import qr from "../../images/qr.png";
import "./login.css";



export default function LoginPage() {
  const { email, setEmail } = useState(null);
  const { password, setPassword } = useState(null);
  const { loading, setLoading } = useState(false);






  
  return (
    <div className="position">
      <div className="container">
        <form action="" className="form-container">
          <div className="form-header">
            <span className="primary-header">Welcome back! </span> <br />
            <span className="secondary-header">
              
              We're so excited to see you again!
            </span>
          </div>

          <FormLabel label={"EMAIL ADDRESS"} />
          <Input className={"input-field"} value={email} />

          <FormLabel label={"PASSWORD"} />
          <Input className={"input-field"} value={password} />

          <Link className="forgot-pw" to={'/test'}> Forgot your password? </Link>
          

          <Button className={"login-btn"} text={"Login"} />

          <span className="register">
            
            Need an account? <Link to={'/test'}> Register </Link> 
          </span>
        </form>

        <div className="qr-cont">
          <img src={qr} className="qr-code" />
          <h4> Log in with QR code </h4>
          <span className="mobile-app">
            
            Scan this with the Thiscord mobile app to log in instantly.
          </span>
        </div>
      </div>
    </div>
  );
}
