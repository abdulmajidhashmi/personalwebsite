import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
const HomePage = () => {
  const [navbarstate, setnavbarstate] = useState(false);
  const closeRef = useRef();

  useEffect(() => {
    if (navbarstate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleclickoutside = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        

        setnavbarstate(false);
      }
    };

    if (navbarstate) {
      document.addEventListener("mousedown", handleclickoutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, [navbarstate]);

  return (
    <div className="main-div">
      <div className="headings">
        <h1>Dr.Hashmi Abdul Wase</h1>
      </div>
      <div className="content-div">
        <ul className="ul-li-div">
          <li className="ul-li">Home</li>
          <li className="ul-li">About</li>
          <li className="ul-li">treatments</li>
          <li className="ul-li">patients</li>
        </ul>
        <div className="strike-line">
          <hr className="line" />
        </div>

        <i
          className="fa-solid fa-bars nav-bar"
          onClick={() => setnavbarstate(true)}
        ></i>
        <div
          ref={closeRef}
          className={` nav-bar-div ${
            navbarstate ? "show-nav-bar" : "hide-nav-bar"
          }`}
        >
          <i
            class="fa-solid fa-xmark cut"
            onClick={() => setnavbarstate(false)}
          ></i>
          <ul className="ul-li-div2">
            <li className="ul-li2">Home</li>
            <li className="ul-li2">About</li>
            <li className="ul-li2">treatments</li>
            <li className="ul-li2">patients</li>
          </ul>
        </div>
        <div className="content-sub-div">
          <div className="left-side-div">
            <h1>Dr.Hashmi Abdul Wase</h1>
            <h2>Neuro-pyschiatrist</h2>
          </div>
          <div className="right-side-div">
            <img alt="imagej"
              className="main-img"
              src="https://clipart-library.com/img/782967.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
