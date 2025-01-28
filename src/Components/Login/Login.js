import { Link, useLocation } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { adddata } from "../redux/reducer/UserReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logincall = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logindata = {};
    for (let [key, value] of data.entries()) {
      if (key === "number") {
        logindata[key] = Number(value);
      } else {
        logindata[key] = value;
      }
    }

    console.log(logindata);
    if (Object.values(logindata).every((value) => value)) {
      loginapicall(logindata);
    }
  };

  const loginapicall = async (logindata) => {
    try {
      const resdata = await axiosInstance.post("/user/login", logindata, {
        withCredentials: true,
      });

      dispatch(adddata(resdata.data.data));

      const user = await axiosInstance.get("/user/self-detail", {
        withCredentials: true,
      });

      if (user.data.data.role === "admin") {
        navigate("/admin");
      } else if (user.data.data.role === "user") {
        const previousPath = location.state?.from || "/";
      
        if (previousPath === "/signup") {
          navigate("/"); // Navigate to home
        } else {
          navigate(-1); // Navigate back to the previous path
        }
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-maindiv">
        <div className="login-div">
          <h1 className="l-head">Login here</h1>
          <Link to="/">
            <i className="fa-solid fa-xmark cross-mark"></i>
          </Link>
          <div>
            <form className="inp-cont" onSubmit={logincall}>
              <input
                className="login-inp"
                name="number"
                type="tel"
                placeholder="Enter number"
              />
              <input
                className="login-inp"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              <button className="login-click">Login</button>
              <Link to="/signup" state={{ from: location.pathname }}>
                <div className="signuphere-div">
                  <p>New user?</p> <p className="signup-here">Sign up here</p>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;