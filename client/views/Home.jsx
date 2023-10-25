import Hero from "../src/Hero";
import Form from "../src/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL_FE } from "../src/camponents/base";
const BASE_URL_FE="https://ideatex.onrender.com";
export default function Home() {
  const [validd, setValidd] = useState(false);
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(0);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`https://ideatex.onrender.com/`)
      .then((res) => {
        console.log(res.data.valid);
        if (res.data.valid) {
          setValidd(true);
          setS1(res.data.s1);
          setS2(res.data.s2);
        } else {
          navigate("/login");
        }
      })
      .catch((e) => console.log(e));
  }, [navigate]);
  return (
    <>
      {validd && (
        <div>
          <div>
            <Hero validd={validd} />
          </div>
          <div>
            <main>
              <Form validd={validd} s1={s1} s2={s2} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
