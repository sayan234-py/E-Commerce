import React from 'react';
import './Hero.css';
// import hand_icon from '../Assets/hand_icon.png';
// import arrow_icon from '../Assets/arrow.png';
// import hero_image from '../Assets/hero_image.png';

const hero_image= "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737857/hero_image_kpfv69.png"
const hand_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737941/hand_icon_yvtcbs.png"
const arrow_icon = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770738007/arrow_ucrdyz.png"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>

        <div className="hero-text">
          <div className="hand-icon-line">
            <p>new</p>
            <img src={hand_icon} alt="hand icon" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>

        <div className="hero-latest-button">
          <span>Latest Collection</span>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
