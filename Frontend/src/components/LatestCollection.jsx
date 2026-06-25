import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import Card from './Card';
import { shopDataContext } from '../context/ShopContext';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      
      <div className='h-auto w-[100%] text-center md:mt-[50px] mb-[20px]'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-[100%] max-w-[600px] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 mt-2'>
          Step Into Style ❘ New Collection Dropping This Season!
        </p>
      </div>

      
<div className='w-[100%] h-auto mt-[30px] flex flex-wrap items-center justify-center gap-[20px] sm:gap-[30px] md:gap-[50px] px-4'>
  {latestProducts && latestProducts.map((item) => (
    <Card 
      key={item._id}
      id={item._id}
      name={item.name}
      image={item.image1} 
      price={item.price}
    />
  ))}
</div>

    </div>
  );
}

export default LatestCollection;