import React from 'react';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller'; 

function Product() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px] overflow-x-hidden'>
      
      
      <div className='w-[100%] min-h-auto py-6 flex flex-col items-center justify-center gap-[10px]'>
        <LatestCollection />
      </div>

      <hr className="w-[90%] border-slate-800/60 my-10" />

      <div className='w-[100%] min-h-auto py-6 flex flex-col items-center justify-center gap-[10px]'>
        <BestSeller />
      </div>

    </div>
  );
}

export default Product;