import React from 'react';
import './Bredcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Bredcrum = ({ product }) => {
  // If product doesn't exist, just show HOME > SHOP
  if (!product) {
    return (
      <div className="bredcrum">
        HOME <img src={arrow_icon} alt="arrow" /> SHOP
      </div>
    );
  }

  return (
    <div className="bredcrum">
      HOME <img src={arrow_icon} alt="arrow" /> SHOP
      {product.category && (
        <>
          <img src={arrow_icon} alt="arrow" /> {product.category}
          <img src={arrow_icon} alt="arrow" /> {product.name}
        </>
      )}
    </div>
  );
};

export default Bredcrum;
