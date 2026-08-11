import React from 'react';
import { Link } from 'react-router-dom';

const ChatProductCard = ({ product, onNavigate }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="chat-product-card"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onNavigate) onNavigate();
      }}
    >
      <div className="chat-product-img-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="chat-product-info">
        <p className="chat-product-name">{product.name}</p>
        <div className="chat-product-prices">
          <span className="chat-product-new">₹{product.new_price}</span>
          {product.old_price ? (
            <span className="chat-product-old">₹{product.old_price}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ChatProductCard;
