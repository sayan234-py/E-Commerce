import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cart_cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  // Fetch all products
  const fetchinfo = async () => {
    const res = await fetch("http://localhost:5001/allproducts");
    const data = await res.json();
    setAllproducts(data);
  };

  useEffect(() => {
    fetchinfo();
  }, []);

  //Delete product
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const res = await fetch("http://localhost:5001/removeproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Product deleted successfully");
      fetchinfo(); // refresh list
    } else {
      alert(data.message || "Failed to delete product");
    }
  };

  return (
    <div className="listproduct">
      <h1>All Product List</h1>

      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />

        {allproducts.map((product) => (
          <div
            key={product.id}
            className="listproduct-format-main listproduct-format"
          >
            <img
              src={product.image}
              alt={product.name}
              className="listproduct-product-icon"
            />
            <p>{product.name}</p>
            <p id="line">₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img
              src={cross_icon}
              alt="Remove"
              onClick={() => removeProduct(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
