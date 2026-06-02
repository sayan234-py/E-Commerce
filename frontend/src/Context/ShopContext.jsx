import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const API_URL =
  process.env.REACT_APP_API_URL || "https://e-commerce-bd1y.onrender.com"; // ✅ Fixed URL

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
        console.error("Products fetch error:", err);
        setTimeout(loadProducts, 3000);
      }
    };
    loadProducts();
  }, []);

  /* ---------- FETCH CART (only if logged in) ---------- */
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch(`${API_URL}/getcart`, {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data || {}))
      .catch((err) => console.error("Cart fetch error:", err));
  }, []);

  /* ---------- ADD TO CART ---------- */
  const addToCart = async (itemId) => {
    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      await fetch(`${API_URL}/addtocart`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (err) {
      console.error("Add to cart error:", err);
      // Rollback on failure
      setCartItems((prev) => ({
        ...prev,
        [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
      }));
    }
  };

  /* ---------- REMOVE FROM CART ---------- */
  const removeFromCart = async (itemId) => {
    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      await fetch(`${API_URL}/removefromcart`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (err) {
      console.error("Remove from cart error:", err);
      // Rollback on failure
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
    }
  };

  /* ---------- TOTAL CART ITEMS ---------- */
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
