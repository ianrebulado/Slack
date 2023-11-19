import React, { useEffect, useState } from "react";
import FormLabel from "../../components/FormLabel";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate, redirect} from "react-router-dom";
import { Slack } from "../../utils/axios";
import "../Signup/signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const payload = {
    email: email,
    password: password,
    password_confirmation: passwordConf
  }

  // handle change
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setPasswordConf(value);
    }
  };




  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
     const res = await Slack.post('/auth', payload)
    
      const token = res.headers.get('access-token');
      const uid = res.headers.get('uid');
      const expiry = res.headers.get('expiry');
      const client = res.headers.get('client');

      Slack.defaults.headers['access-token'] = token;
      Slack.defaults.headers['uid'] = uid;
      Slack.defaults.headers['expiry'] = expiry;
      Slack.defaults.headers['client'] = client;

      localStorage.setItem('token', token)
      localStorage.setItem('uid', uid)
      localStorage.setItem('expiry', expiry)
      localStorage.setItem('client', client)

    navigate('/')

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="position">
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signupform-container">
          <div className="signup-header">Create an account </div>
          <FormLabel label={"EMAIL"} />
          <Input
            className={"input-field"}
            type={"email"}
            name={"email"}
            value={email}
            onChange={handleChange}
          />
          <FormLabel label={"PASSWORD"} />
          <Input
            className={"input-field"}
            type={"password"}
            name={"password"}
            value={password}
            onChange={handleChange}
          />
          <FormLabel label={"CONFIRM PASSWORD"} />
          <Input
            className={"input-field"}
            type={"password"}
            name={"passwordConf"}
            value={passwordConf}
            onChange={handleChange}
          />
          <Button className={"login-btn"} text={"Continue"} />
          <span className="tos">
            {" "}
            By registering, you agree to Thiscord's Terms of Service and Privacy
            Policy.{" "}
          </span>{" "}
          <br />
          <br />
          <Link to={"/"} className="redirect">
            {" "}
            Already have an account?{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
