import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <>
      <div className="login-maindiv">
        <div className="login-div">
          <h1 className="l-head">Login here</h1>
          <Link to='/'><i class="fa-solid fa-xmark cross-mark"></i></Link>
<div className="inp-cont">
          <input className="login-inp" placeholder="Enter Email" />
          <input className="login-inp" placeholder="Enter password" />

          <div className="login-click">Login</div>

         <Link to="/signup">
        <div className="signuphere-div"><p>New user?</p> <p className="signup-here">Sign up here</p></div> 
          </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
