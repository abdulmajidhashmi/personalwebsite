import "./SingleDisease.css";
import { Link } from "react-router-dom";

const SingleDisease = ({ data }) => {

  
  return (
    <>
      <div class="card" >
        <div class="card-image-wrapper">
          <img src={data.image} alt={data.title} class="card-image" />
        </div>
        <div class="card-content">
          <h3 class="card-title">{data.title}</h3>
          <p class="card-description">{data.shortDiscription}</p>
          <Link to={`/${data.title.replace(/\s+/g, "")}`} class="card-link">
            Learn more →
          </Link>
        </div>

       
      </div>
    </>
  );
};

export default SingleDisease;
