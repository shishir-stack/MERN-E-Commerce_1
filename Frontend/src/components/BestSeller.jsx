import  { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';

function BestSeller() {

  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      
      const filterProduct = products.filter((item) => item.bestseller === true || item.bestseller === "true");
      setBestSeller(filterProduct.slice(0, 4)); 
    }
  }, [products]); //

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      
      
      <div className='h-auto w-[100%] text-center md:mt-[50px] mb-[20px]'>
        <Title text1={"BEST"} text2={"SELLER"} /> {/* */}
        <p className='w-[100%] max-w-[600px] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 mt-2'>
          Tried, Tested, Loved ❘ Discover Our All-Time Best Sellers. {/* */}
        </p>
      </div>

      
      <div className='w-[100%] h-auto mt-[30px] flex flex-wrap items-center justify-center gap-[20px] sm:gap-[30px] md:gap-[50px] px-4'>
        {bestSeller.map((item, index) => ( 
          <Card 
            key={item._id || index} 
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

export default BestSeller;