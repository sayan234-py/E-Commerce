import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {

  const {addToCart} = useContext(ShopContext);
  
  if (!product) {
    return null; 
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className="productdisplay-main-img"src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(124)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">₹{product.old_price}</div>
            <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            Whether you're upgrading your wardrobe, enhancing your lifestyle, or gifting someone special, 
            the <b>{product.name}</b> is made to impress. Its fine detailing, superior build quality, and 
            thoughtful design make it an essential addition to your collection.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
        <p className='productdisplay-right-category'><span>Category:</span>{product.category},Wearings,T-Shirt</p>
        <p className='productdisplay-right-category'><span>Tags:</span>New Trend,Modern,Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
