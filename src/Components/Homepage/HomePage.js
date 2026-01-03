import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
const HomePage = () => {
  const [navbarstate, setnavbarstate] = useState(false);
  const closeRef = useRef();

  const userdata = useSelector((state) => state.User.value);



  useEffect(() => {

    console.log(userdata);
    if (navbarstate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleclickoutside = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {


        setnavbarstate(false);
      } else {
        document.body.style.overflow = "auto";
      }
    };

    if (navbarstate) {
      document.addEventListener("mousedown", handleclickoutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, [navbarstate, userdata]);

  return (
    <div className="main-div">

      <div className="headings">

        <div className="heading_1">
        <i className="fa-solid fa-staff-snake snake"></i>
        <h1 className="head">Dr.Hashmi Abdul Wase</h1>
    </div>
 <div className="heading_1">
        <div className="head2">
          <i class="fa-regular fa-address-book header_icon"></i>
          <p  className="head2_child"> call for appointment +91 999-999-9990  </p>
        </div>

        <div className="head2">
          <i className="fa-regular fa-message header_icon" ></i>
          <p className="head2_child">abdul_wase@gmail.com</p>
        </div>
        </div>

      </div>
      <div className="content-div">

        <ul className="ul-li-div">
          <li className="ul-li">Home</li>
          <li className="ul-li">About</li>
          <HashLink smooth to="#treat"><li className="ul-li">treatments</li> </HashLink>
          <li className="ul-li">patients</li>
        </ul>
        <Link to="/login"><div className="userenddiv"><i className="fa-regular fa-user userend"></i></div> </Link>

        <div className="strike-line">
          <hr className="line" />
        </div>

        <i
          className="fa-solid fa-bars nav-bar"
          onClick={() => setnavbarstate(true)}
        ></i>


        <div
          ref={closeRef}
          className={` nav-bar-div ${navbarstate ? "show-nav-bar" : "hide-nav-bar"
            }`}
        >
          <i
            className="fa-solid fa-xmark cut"
            onClick={() => setnavbarstate(false)}
          ></i>






          <div class="nav-menu">
            <a href="#dashboard" class="nav-item active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>
            <a href="#patients" class="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Patients
            </a>
            <Link to="/book-appoinment" class="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Appointments
            </Link>
            <Link to="/chat" class="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat
            </Link>
            <a href="#settings" class="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>

            <Link to="/login" class="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="nav-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12H3m12 0l-4-4m4 4l-4 4m13-8h-5a2 2 0 00-2 2v8a2 2 0 002 2h5a2 2 0 002-2v-8a2 2 0 00-2-2z"
                />
              </svg>
              Login
            </Link>
          </div>


        </div>
        <div className="content-sub-div">

          <div class="feature-list">
            <div class="feature-item">
              <div class="icon-wrapper green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon green-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="text">Secure Video Consultations</span>
            </div>
            <div class="feature-item">
              <div class="icon-wrapper blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon blue-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span class="text">Easy Appointment Booking</span>
            </div>
            <div class="feature-item">
              <div class="icon-wrapper purple">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon purple-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span class="text">Access Medical Records</span>
            </div>
          </div>

          <div className="left-side-div">
            <h1 className="title_main_heading">Dr.Hashmi Abdul Wase</h1>
            <h3 className="title_sub_heading">Neuro-pyschiatrist</h3>
          </div>



          <div className="right-side-div">
            <img alt="logo"
              className="main-img"
              src='/logo.png' loading="eager"
            />


          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;


// src="https://www.freeiconspng.com/uploads/transparent-medical-doctor-background-logos-18.png"