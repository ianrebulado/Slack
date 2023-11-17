import React, { useEffect, useState } from "react";
import FormLabel from "../../components/FormLabel";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "../Signup/signup.css";
import { Link, useNavigate, redirect} from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setPasswordConf(value);
    }
  };

  // check if states are changing
  useEffect(()=> {
    console.log('email',email)
    console.log('pw', password)
    console.log('pwc', passwordConf)
  },[email, password, passwordConf])



  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = fetch("http://206.189.91.54/api/v1/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirmation: passwordConf,
        }),
      });

      if (res.status >= 200 && res.status < 300) {
        redirect("/");
      } else {
        console.error()
      }
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
