import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-primary text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/1877.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start">
            <div className="container d-flex flex-column align-items-start">
              <Link to="/Product" className="btn btn-light " id="button-pos" style={{ color: "#053f4c" }}> 
                Shop Now
              </Link>
              
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Home;
