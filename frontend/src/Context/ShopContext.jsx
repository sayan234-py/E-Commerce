import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://e-commerce-1-6kbc.onrender.com";

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/allproducts`);
      const data = await res.json();
      setAll_products(data);
    } catch (err) {
      setTimeout(loadProducts, 3000);
    }
  };
  loadProducts();
}, []);

  /* ---------- FETCH CART ---------- */
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
        .then((data) => setCartItems(data || {}))
        .catch((err) => console.error("Cart fetch error:", err));
    }
  }, []);

  /* ---------- ADD TO CART ---------- */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  /* ---------- REMOVE FROM CART ---------- */
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  /* ---------- TOTAL CART ITEMS ---------- */
  const getTotalCartItems = () => {
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
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
