import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <Link to={`/product/${id}`} className="item-link">
      <div className="item">
        <img src={image} alt={name} />
        <p>{name}</p>

        <div className="item-prices">
          <span className="item-price-new">₹{new_price}</span>
          <span className="item-price-old">₹{old_price}</span>
        </div>
      </div>
    </Link>
  );
};

export default Item;
