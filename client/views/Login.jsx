import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import { BASE_URL_FE } from "../src/camponents/base";
const BASE_URL_FE="https://ideatex.onrender.com";

export default function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`https://ideatex.onrender.com/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.exists == "exists") {
            history("/");
          } else if (res.data.exists == "notExists") {
            alert("Wrong Username or Password");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="boduy">
        <div className="box ">
          <span className="borderLine"></span>
          <form
            className="Form1 flex flex-col  items-center"
            action="/login"
            method="post"
            autoComplete="off"
          >
            <h2>Sign in</h2>
            <div className="inputBox">
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required="required"
              />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required="required"
              />
              <span>Password</span>
              <i></i>
            </div>
            <input type="submit" value="Login" onClick={submit} />
          </form>
        </div>
      </div>
    </>
  );
}
