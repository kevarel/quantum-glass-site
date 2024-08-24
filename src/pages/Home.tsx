import React from 'react';
import landingPageImage from '../images/landing_page_image.png';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  return (
    <div>
      <img src={landingPageImage} className="landing-image" alt="Landing Page Image" />

      <nav className="landing-nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/gallery" className="nav-button">Gallery</Link>
      </nav>

      <h1 className="landing-company-name">Quantum Glass</h1>
      <h1 className="landing-company-quote">Professional Installation and Repairs</h1>
      <h2 className="landing-company-sub-quote">It Is Quality, Rather Than Quantity, That Matters.</h2>

      <button className="book-now-button"><a>Book Now</a></button>

      <section className="section-one">
        <div className="section-one-title">About Us</div>
        <div className="left-side">
          <div className="text-content">
            <h3>Need Glass Service, Repair, Replacement or Installation?</h3>
            <p>At Quantum Glass, we are committed to providing homeowners with the highest quality home glass repair, residential glass replacement and installation services.</p>
          </div>
        </div>
        <div className="right-side">
          <div className="text-content">
            <br />
            <h1>Customer Satisfaction Guaranteed!</h1>
          </div>
        </div>
      </section>

      {/* <section className="section-two">
        <div className="section-one-title">Reviews</div>
        <div className="left-side">
          <div className="text-content">
            <h3>Need Glass Service, Repair, Replacement or Installation?</h3>
            <p>At Quantum Glass, we are committed to providing homeowners with the highest quality home glass repair, residential glass replacement and installation services.</p>
          </div>
        </div>
        <div className="right-side">
          <div className="text-content">
            <br />
            <h1>Customer Satisfaction Guaranteed!</h1>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;