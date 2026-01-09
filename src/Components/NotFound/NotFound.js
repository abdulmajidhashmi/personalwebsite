import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
   
      <h1 className="notfound-error">Error <span className="notfound-code">404</span></h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-text">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="notfound-button">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
