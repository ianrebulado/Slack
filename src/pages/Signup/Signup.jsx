import React, { useState } from "react";
import FormLabel from "../../components/FormLabel";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Slack } from "../../utils/axios";
import { toastSuccess, toastError } from "../../utils/toast";
import "../Signup/signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const payload = {
    email: email,
    password: password,
    password_confirmation: passwordConf,
  };

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
  }

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    if(password != passwordConf){
      toastError("Passwords don't match. Please try again.")
    }
    try {
      const res = await Slack.post("/auth", payload);

      const token = res.headers.get("access-token");
      const uid = res.headers.get("uid");
      const expiry = res.headers.get("expiry");
      const client = res.headers.get("client");

      Slack.defaults.headers["access-token"] = token;
      Slack.defaults.headers["uid"] = uid;
      Slack.defaults.headers["expiry"] = expiry;
      Slack.defaults.headers["client"] = client;

      localStorage.setItem("token", token);
      localStorage.setItem("uid", uid);
      localStorage.setItem("expiry", expiry);
      localStorage.setItem("client", client);

      toastSuccess("Success! Redirecting to login page...")
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      toastError("Invalid credentials");
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
            By registering, you agree to Thiscord's Terms of Service and Privacy
            Policy.
          </span>
          <br />
          <br />
          <Link to={"/"} className="redirect">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}
