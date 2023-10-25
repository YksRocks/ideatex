import Lottie from "lottie-react";
import lot from "./assets/animation_lnz14p93.json";
import eCellLogo from "./assets/white logo br.png";
import ideateXLogo from "./assets/IdeateX_Logo.png";
import "./Hero.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { BASE_URL_FE } from "./camponents/base";
const BASE_URL_FE="https://ideatex.onrender.com";

export default function Hero({ validd }) {
  const history = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL_FE}/logout`).then((res) => {
        if (res.data == "logedOut") {
          history("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className=" flex flex-row justify-between items-center">
        <Link href="https://e-cell.in/" target="_blank" rel="noreferrer">
          <img
            src={eCellLogo}
            alt="E-Cell logo"
            className="w-[60px] h-[60px]"
          />
        </Link>
        {/* <h1 className=" ideathon underline text-10xl">IdeateX</h1> */}
        <img
          src={ideateXLogo}
          alt="ideateX logo"
          className="w-[35px] h-[50px]"
        />
        <Link href={validd ? "" : "/login"}>
          {validd ? (
            <form action="/logout" method="post">
              {/* <button type="submit" onClick={handleLogout}>
                Logout
              </button> */}
              <div
                tabIndex="0"
                className="signInButton"
                type="submit"
                onClick={handleLogout}
              >
                <p className="signInButtonText">Logout</p>
              </div>
            </form>
          ) : (
            <button>Login</button>
          )}
        </Link>
      </div>
      <section className="container px-0 flex  w-full">
        <div className="flex flex-col md:flex-row items-center content">
          {/*  */}
          <div className="md:w-1/2 flex justify-center  order-1 loti md:order-2 mb-8 mt-8">
            <Lottie animationData={lot} loop={true} className=" lg:flex" />
          </div>
          <div className="md:w-1/2 text-center md:text-left order-2 md:order-1 ">
            <div className="row flex justify-center">
              <div className="col-10 flex flex-col items-center md:w-4/5 lg:col-8 blurb mb-5 md:mb-0">
                <h1 className="wii  text-5xl mb-8 text-center typing">
                  What is IdeateX?
                </h1>
                <p className="lead pa mb-5 text-center">
                  IdeateX is a unique platform where aspiring entrepreneurs and
                  creative minds come together to pitch their groundbreaking
                  ideas. It a competition that fuels innovation, providing a
                  stage for participants to showcase their vision and passion.
                  From disruptive startups to sustainable solutions, IdeateX is
                  the birthplace of future industry leaders.
                </p>
                <div className="mt-5">
                  <Link
                    href="https://e-cell.in/contactus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="button">
                      <span className="button_lg">
                        <span className="button_sl"></span>
                        <span className="button_text">Brochure </span>
                      </span>
                    </button>
                  </Link>
                  <Link
                    href="https://e-cell.in/contactus"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-5"
                  >
                    <button className="button">
                      <span className="button_lg">
                        <span className="button_sl"></span>
                        <span className="button_text">Contact Us</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
