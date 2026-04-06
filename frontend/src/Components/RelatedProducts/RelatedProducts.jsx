import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";
import "./RelatedProducts.css";

const RelatedProducts = ({ product }) => {
  const { all_product } = useContext(ShopContext);

  if (!product || !all_product.length) return null;

  const related = all_product.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="related-grid">
        {related.slice(0, 4).map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
