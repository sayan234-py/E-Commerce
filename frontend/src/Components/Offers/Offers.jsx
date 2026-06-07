import React from 'react';
import './Offers.css';

// Your original asset (commented out just in case you need it later)
// const exclusive_image_original = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770738107/exclusive_image_kmgre2.png";

// A curated Y2K street style asset that matches the brutalist aesthetic perfectly
const exclusive_image = "https://images.unsplash.com/photo-1617317376997-8748e6862c01?auto=format&fit=crop&w=800&h=800&q=80";

const Offers = () => {
  return (
    <div className="genz-offers">
      <div className="offers-grid">
        
        {/* Left Side: Typography & Interactions */}
        <div className="offers-content">
          <div className="offers-badge">! RARE FIND</div>
          
          <h1 className="offers-title">
            <span className="hollow">EXCLUSIVE</span>
            <div className="solid">OFFERS FOR YOU.</div>
          </h1>
          
          <p className="offers-desc">* ONLY ON BEST SELLERS PRODUCT *</p>
          
          <button className="btn-offers">
            CHECK NOW ⚡
          </button>
        </div>

        {/* Right Side: Retro Polaroid Frame */}
        <div className="offers-image-panel">
          <div className="polaroid-container">
            <div className="tape"></div>
            <img src={exclusive_image} alt="Exclusive Offer" />
            <div className="polaroid-caption">ARCHIVE_LOOT.JPG</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Offers;
