import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, new_price }) => {
  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div>
        <img src={image} alt={name} />
        <p>{name}</p>
        <p>₹{new_price}</p>
      </div>
    </Link>
  );
};

export default Item;
