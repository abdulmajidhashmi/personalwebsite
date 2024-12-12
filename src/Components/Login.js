import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <>
      <div className="login-maindiv">
        <div className="login-div">
          <h1>Login here</h1>

          <input className="login-inp" placeholder="Enter Email" />
          <input className="login-inp" placeholder="Enter password" />

          <div className="login-click">Login</div>

          <Link to="/signup">
            <p>New user?Sign up here</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
