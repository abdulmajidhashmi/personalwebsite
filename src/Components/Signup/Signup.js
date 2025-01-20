import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
const Signup = () => {

  const navigate = useNavigate();
  const submitform = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const userData = {};
    for (let [key, value] of form.entries()) {

      if(key === "number"){

userData[key]  =Number(value);
      }else{
      userData[key] = value;
    }
  }

    signupcall(userData);

    console.log(userData);
  };

  const signupcall = async (userData) => {
    try {
      const resdata = await axiosInstance.post("/user/signup", userData,{withCredentials: true});

      console.log(resdata.data.data);

      
      if(resdata.data.success===true){
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-maindiv">
      <div className="signup-div">
        <h1 className="s-head">Sign up here</h1>

        <div>
          <Link to="/">
            <i className="fa-solid fa-xmark cross-mark"></i>
          </Link>
          <form onSubmit={submitform} className="s-inp-div">
            <input
              className="signup-inp"
              name="name"
              placeholder="Enter Name"
            />
            <input
              className="signup-inp"
              name="number"
              placeholder="Enter Number"
              type="tel"
            />
            <input
              className="signup-inp"
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            <input
              className="signup-inp"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />

            <button className="signup-button" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <div className="already-userdiv">
                <p>Already a user?</p>
                <p className="already-user">Login here</p>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
