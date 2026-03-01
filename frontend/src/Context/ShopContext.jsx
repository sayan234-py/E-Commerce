import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://e-commerce-1-6kbc.onrender.com";

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCTS */
  useEffect(() => {
    fetch(`${API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        setAll_products(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  return (
    <ShopContext.Provider
      value={{ all_product, cartItems, addToCart, loading }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
