import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="item-link"
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="item">
        <img src={image} alt={name} />
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">₹{new_price}</div>
          <div className="item-price-old">₹{old_price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
