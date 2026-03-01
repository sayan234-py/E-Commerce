import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

/* ================= API BASE ================= */
const API_URL = process.env.REACT_APP_API_URL ||"https://e-commerce-1-6kbc.onrender.com";

const ShopContextProvider = (props) => {
  const [all_product, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({}); 

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch(`${API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAll_products(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/getcart`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) setCartItems(data);
        })
        .catch((err) => console.error("Cart fetch error:", err));
    }
  }, []);

  /* ================= ADD TO CART ================= */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/addtocart`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }).catch((err) => console.error(err));
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/removefromcart`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }).catch((err) => console.error(err));
    }
  };

  /* ================= TOTAL CART ITEMS ================= */
  const getTotalCartItmes = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItmes,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
