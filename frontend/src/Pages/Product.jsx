import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Bredcrum from '../Components/Bredcrums/Bredcrum';
import ProductDisplay from '../Components/ProductDispaly/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
// import '../Pages/CSS/Product.css';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams(); 

  
  const product = all_product.find((item) => item.id === Number(productId));

  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
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
