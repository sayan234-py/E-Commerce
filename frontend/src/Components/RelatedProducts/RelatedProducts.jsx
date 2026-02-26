import React from 'react'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import './RelatedProducts.css';


const RelatedProducts = () => {
  return (
    <div className='relatedrrpoducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedrrpoducts-item">
            {data_product.map((item, i) => (
          <Item
            key={i}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
        </div>
    </div>
  )
}

export default RelatedProducts;