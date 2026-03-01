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

  if (!all_product.length) return <h2>Loading...</h2>;

  const product = all_product.find(
    (item) => String(item.id) === String(productId)
  );

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="product-page">
      <Bredcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
};

export default Product;
