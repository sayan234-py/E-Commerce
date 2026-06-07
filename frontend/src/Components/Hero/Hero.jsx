import React from 'react';
import './Hero.css';

// Your original assets (commented out just in case you need them later)
// const hero_image_original = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737857/hero_image_kpfv69.png"
// const hand_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737941/hand_icon_yvtcbs.png"
// const arrow_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770738007/arrow_ucrdyz.png"

// The curated Gen-Z streetwear asset for the retro window
const hero_image = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&h=1000&q=80";

const Hero = () => {
  return (
    <div className="genz-banner">
      
      {/* Scrolling Marquee Tape */}
      <div className="marquee">
        <span>
          * NEW DROP * LIMITED STOCK * COP IT NOW * NEW DROP * LIMITED STOCK * COP IT NOW * NEW DROP * LIMITED STOCK * COP IT NOW * NEW DROP * LIMITED STOCK * COP IT NOW * NEW DROP *
        </span>
      </div>

      <div className="grid-container">
        {/* Left Side: Typography & Interactions */}
        <div className="content">
          <div className="badge">Y2K ARCHIVE</div>
          
          <h1 className="title">
            <span>LATEST</span>
            <div className="filled">DROPS.</div>
          </h1>
          
          <a href="#shop" className="btn-brutalist">
            SHOP NOW ↗
          </a>
        </div>

        {/* Right Side: Retro Computer Window */}
        <div className="image-panel">
          <div className="photo-container">
            {/* Fake Web 1.0 OS Window Bar */}
            <div className="window-bar">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            
            {/* Photo Asset */}
            <img src={hero_image} alt="Streetwear Archive" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
