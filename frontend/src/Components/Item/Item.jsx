import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="item-link"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="item">
        <div className="item-img-container">
          <img src={image} alt={name} />
        </div>

        <div className="item-details">
          <p className="item-name">{name}</p>

          <div className="item-prices">
            <span className="item-price-new">₹{new_price}</span>
            {old_price && (
              <span className="item-price-old">₹{old_price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
