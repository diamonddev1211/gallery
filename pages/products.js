import React, { useState } from 'react';
import Product from '@/components/Product';
import data from '@/utils/products.json';

export default function Products() {
  const [products, setProducts] = useState(data);

  const handleUpdatePhotoLink = (id, url) => {
    const clonedProducts = [...products];
    clonedProducts.map(product => {
      if (product.id === id) {
        product.url = url;
      }
    });
    setProducts(clonedProducts);
  }

  return (
    <div className='p-10 flex flex-wrap'>
      {
        products.map(product => {
          return <div key={product.id} className='w-1/4 p-5'>
            <Product {...product} onUpdate={handleUpdatePhotoLink} />
          </div>
        })
      }
    </div>
  )
}
