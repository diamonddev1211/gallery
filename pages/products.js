import React from 'react';
import Product from '@/components/Product';

export default function Products() {
  return (
    <div className='p-8 md:p-10 flex flex-wrap'>
      {
        Array.from(Array(50)).map((item, index) => {
          return <div key={index} className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-0 pb-8 md:p-5'>
            <Product key={index} index={index} />
          </div>
        })
      }
    </div>
  )
}
