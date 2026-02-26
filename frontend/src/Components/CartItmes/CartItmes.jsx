import React, { useContext } from "react";
import "./CartItmes.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  /* ---------------- TOTAL CALCULATION ---------------- */
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (!all_product || all_product.length === 0) return 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );

        
        if (!itemInfo) continue;

        totalAmount += itemInfo.new_price * quantity;
      }
    }

    return totalAmount;
  };

  if (!all_product || all_product.length === 0) {
    return <p style={{ padding: "40px" }}>Loading cart...</p>;
  }

  return (
    <div className="cartitems">

      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />


      {all_product.map((e) => {
        const quantity = cartItems?.[e.id] || 0;
        if (quantity > 0) {
          return (
            <div key={e.id} className="cartitems-format">
              <img
                src={e.image}
                alt={e.name}
                className="carticon-product-icon"
              />
              <p>{e.name}</p>
              <p>₹{e.new_price}</p>
              <button className="cartitems-quantity">
                {quantity}
              </button>
              <p>₹{(e.new_price * quantity).toFixed(2)}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt="remove"
                className="remove-icon"
              />
            </div>
          );
        }
        return null;
      })}


      <div className="cartitmes-down">
        <div className="cartitmes-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitmes-total-item">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitmes-total-item">
              <p>Shipping Fee</p>
              <p>{getTotalCartAmount() > 0 ? "Free" : "₹0"}</p>
            </div>
            <hr />
            <div className="cartitmes-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
            </div>
            <hr />
          </div>
        </div>
        <button>Checkout</button>
      </div>

      {/* PROMO CODE */}
      <div className="cartitmes-promocode">
        <p>If You Have a Promo Code, Enter Here</p>
        <div className="cartitmes-promobox">
          <input type="text" placeholder="Promo code" />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
