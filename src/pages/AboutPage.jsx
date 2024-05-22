import React from 'react';
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <img
            className="card-img img-fluid"
            src="./assets/op.jpg"
            alt="Card"
            height={500}
          />
          <div />
      <Footer />
    </>
  )
}

export default AboutPage