import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDispaly/ProductDisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // WAIT until products load
  if (!all_product || all_product.length === 0) {
    return <h2 style={{padding:"40px"}}>Loading products...</h2>;
  }

  const product = all_product.find(
    (item) => String(item.id) === String(productId)
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return <ProductDisplay product={product} />;
};

export default Product;
