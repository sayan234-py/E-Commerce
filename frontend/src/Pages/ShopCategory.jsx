import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import Item from "../Components/Item/Item.jsx";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import "./CSS/ShopCategory.css";
const ShopCategory = ({ banner, category }) => {
  const { all_product } = useContext(ShopContext);
  const filteredProducts = all_product.filter(
    (item) => item.category === category
  );

  return (
    <div className="shop-category">
      <img src={banner} alt="" className="shopcategory-banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>
    </div>
  );
};
export default ShopCategory;
