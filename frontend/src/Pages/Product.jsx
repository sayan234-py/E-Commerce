import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Bredcrum from '../Components/Bredcrums/Bredcrum';
import ProductDisplay from '../Components/ProductDispaly/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // 🔴 Wait until products load
  if (!all_product.length) {
    return <h2 style={{padding:"40px"}}>Loading...</h2>;
  }

  const product = all_product.find(
    (item) => item.id === Number(productId)
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="product-page">
      <Bredcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
