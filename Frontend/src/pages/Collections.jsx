import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './../components/Title';
import Card from './../components/Card';

function Collections() {
  
  const { products, search, showSearch } = useContext(shopDataContext);

  
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false); 

  
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

 
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  
  const applyFilterAndSort = () => {
    let productsCopy = products ? [...products] : [];

    
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

   
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => {
        if (!item.subCategory) return false;
        
        return subCategory.some(sub => sub.toLowerCase() === item.subCategory.toLowerCase());
      });
    }

   
    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilterProducts(productsCopy);
  };

  
  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, products, search, showSearch, sortType]);

  return (
   
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col md:flex-row gap-1 md:gap-10 pt-24 px-4 md:px-10 font-sans'>
      
      
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-medium text-[#c3f6fa] md:cursor-default'>
          FILTERS
          <span className={`text-sm md:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}>▶</span>
        </p>

        <div className={`border border-[#80808049] bg-[#ffffff0a] backdrop-blur-lg rounded-lg pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='mb-3 text-sm font-semibold text-[#c3f6fa] tracking-wide'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-300'>
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </label>
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </label>
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        
        <div className={`border border-[#80808049] bg-[#ffffff0a] backdrop-blur-lg rounded-lg pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='mb-3 text-sm font-semibold text-[#c3f6fa] tracking-wide'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-300'>
            
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> TopWear
            </label>
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> BottomWear
            </label>
            <label className='flex gap-2 items-center cursor-pointer hover:text-white transition-colors'>
              <input className='w-4 h-4 accent-[#c3f6fa]' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> WinterWear
            </label>
          </div>
        </div>
      </div>

      
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-6 items-center gap-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select onChange={(e) => setSortType(e.target.value)} className='border border-[#80808049] bg-[#0c2025] text-white text-sm px-3 py-2 rounded-md outline-none cursor-pointer focus:border-[#c3f6fa] transition-all sm:w-auto w-full'>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        
        <div className='w-full h-auto mt-[30px] flex flex-wrap items-center justify-center sm:justify-start gap-[20px] sm:gap-[30px] md:gap-[40px] pb-10'>
          {
            filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <Card 
                  key={item._id || index}
                  id={item._id}
                  name={item.name}
                  image={item.image1} 
                  price={item.price}
                />
              ))
            ) : (
              <div className='w-full text-center py-20 text-gray-400 text-lg border border-dashed border-[#80808049] rounded-lg bg-[#ffffff02]'>
                No products found matching your search or filters.
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
}

export default Collections;