import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const RelatedProducts = ({ product }) => {
  const { all_product } = useContext(ShopContext);

  if (!product || !all_product.length) return null;

  const related = all_product.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (
    <div>
      <h2>Related Products</h2>
      <div>
        {related.slice(0, 4).map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
