import { useState } from "react";
import { Link } from "react-router-dom";
import Submit from "./Submit";
import axios from "axios";
import "./Form.css";
import Lottie from "lottie-react";
import lot1 from "./assets/animation_lnohzeew.json";
import lot2 from "./assets/animation_lnqdwyru.json";
// import { BASE_URL_FE } from "./camponents/base";
const BASE_URL_FE="https://ideatex.onrender.com";

export default function Form({ validd, s1, s2 }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isFirstClicked, setisFirstClicked] = useState(false);
  const [isSecondClicked, setisSecondClicked] = useState(false);

  const [s11, setS11] = useState(0);
  const [s22, setS22] = useState(0);

  const handleFirstClick = () => {
    setTimeout(() => {
      setisFirstClicked(true);
      s1 = 1;
      let s222 = 0;
      if (s2 == 1) {
        s222 = 1;
      } else {
        s222 = s22;
      }
      axios
        .post(`${BASE_URL_FE}/update`, { s1, s222 })
        .then((res) => {
          if (res.data == "done") {
            setS11(s1);
            return;
          }
        })
        .catch((e) => console.log(e));
    }, 5000);
    isFirstClicked ? "" : setisSecondClicked(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
  };

  const handleSecondClick = () => {
    setTimeout(() => {
      setisSecondClicked(true);
      s2 = 1;
      const s111 = s11;
      axios
        .post(`${BASE_URL_FE}/updatee`, { s111, s2 })
        .then((res) => {
          if (res.data == "done") {
            setS22(s2);
            return;
          }
        })
        .catch((e) => console.log(e));
    }, 5000);
  };

  return (
    <>
      <section className="flex flex-col  md:flex-row">
        <div className="md:w-1/2 mt-5 w-full flex flex-col justify-center items-center order-2 md:order-1">
          <button
            href=""
            className={
              s1
                ? " complete rd mb-5"
                : isFirstClicked
                ? " complete rd mb-5"
                : " rd text-black bg-transparent mb-5"
            }
          >
            <div className="flex flex-row items-center">
              <Link
                onClick={handleFirstClick}
                href={
                  s1
                    ? () => handleDoubleClick()
                    : isFirstClicked
                    ? () => handleDoubleClick()
                    : "https://devfolio.co/"
                }
                target="_blank"
                role="link"
                rel="noreferrer"
                className={s1 ? "rdd" : isFirstClicked ? "rdd" : "rddd"}
              >
                {"Step 1 ->  "}Register on devfolio{" "}
              </Link>
              {s1 ? (
                <span style={{ display: "inline" }}>
                  <Lottie
                    animationData={lot1}
                    loop={true}
                    className=" w-[35px] lg:flex"
                  />
                </span>
              ) : isFirstClicked ? (
                <span style={{ display: "inline" }}>
                  <Lottie
                    animationData={lot1}
                    loop={true}
                    className=" w-[35px] lg:flex"
                  />
                </span>
              ) : (
                ""
              )}
            </div>
          </button>
          <button
            data-text={"Please Complete the step 1 first"}
            className={
              s2
                ? "complete mk mb-5"
                : isFirstClicked
                ? isSecondClicked
                  ? "complete mk mb-5"
                  : "mk mkk bg-transparent mb-5"
                : "tooltip mk mkk bg-transparent mb-5"
            }
          >
            <div className="flex flex-row items-center">
              <Link
                onClick={isFirstClicked ? () => handleSecondClick() : ""}
                href={
                  s2
                    ? () => handleDoubleClick()
                    : isFirstClicked
                    ? isSecondClicked
                      ? () => handleDoubleClick()
                      : "https://www.youtube.com/"
                    : () => handleClick()
                }
                target="_blank"
                rel="noreferrer"
                className={
                  s2
                    ? "rdd"
                    : isFirstClicked
                    ? isSecondClicked
                      ? "rdd"
                      : "mk"
                    : "Form mk"
                }
              >
                {"Step 2 ->  "}Give test on krayon
              </Link>
              {s2 ? (
                <span style={{ display: "inline" }}>
                  <Lottie
                    animationData={lot1}
                    loop={true}
                    className=" w-[35px] lg:flex"
                  />
                </span>
              ) : isFirstClicked ? (
                isSecondClicked ? (
                  <span style={{ display: "inline" }}>
                    <Lottie
                      animationData={lot1}
                      loop={true}
                      className=" w-[35px] lg:flex"
                    />
                  </span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </button>

          <button
            onClick={() => {
              s1 && s2
                ? setButtonPopup(true)
                : isFirstClicked
                ? isSecondClicked
                  ? setButtonPopup(true)
                  : ""
                : "";
            }}
            className={
              s1 && s2
                ? "bg-transparent border-solid border border-[#646cff]"
                : isFirstClicked
                ? isSecondClicked
                  ? " bg-transparent border-solid border border-[#646cff]"
                  : "Form tooltip text-[#808080]  bg-transparent border-solid border border-[#646cff]"
                : "tooltip text-[#808080]  bg-transparent border-solid border border-[#646cff]"
            }
            data-text="Please Complete the above steps first"
            disabled={
              s1 && s2
                ? ""
                : isFirstClicked
                ? ""
                : isSecondClicked
                ? ""
                : isSecondClicked
            }
          >
            Done
          </button>
          <Submit trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3 style={{ color: "black" }}>🎊Thanks for Registering🎊</h3>
          </Submit>
          {/* 🎉🎊 */}
        </div>

        <div className="md:w-1/2 w-full flex flex-col  md:items-center items-center justify-center order-1 md:order-2 ">
          <h1 className="mb-5 RN text-center md:text-right ">
            Register Now !!!
          </h1>
          <div
            className="flex items-center p-4 mb-4 mt-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center md:text-left"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alert!</span> You have to complete
              all the steps to get eligible otherwise you will be disqualified.
            </div>
          </div>
          <p className="text-center mt-5  mb-10 md:mb-5">
            Take part in IdeateX 2023, an extravaganza of creativity,
            innovation, and entrepreneurial spirit. Organized by the
            Entrepreneurship-Cell at KIET Group of Institutions, Ghaziabad,
            IdeateX is not just an event. It&apos;s a journey that celebrates
            the power of ideas and the courage to innovate.
          </p>
          <div className="justify-end md:h-[40px] md:w-30 h-20   md:border-solid md:border-2 md:border-[#646cff] bg-transparent flex overflow-hidden items-center rounded-xl mb-8 md:mb-0 ">
            <Lottie
              animationData={lot2}
              loop={true}
              className="w-[500px] md:w-[200px] h-[150px] md:h-[150px] lg:flex md:rotate-90"
            />
          </div>
        </div>
      </section>
    </>
  );
}
