import React, { useState, useEffect } from 'react';
import Background from '../components/Background'; 
import Hero from '../components/Hero';
import Product from './Product';
import Policy from '../components/Policy';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection ", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" }
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => prevCount === heroData.length - 1 ? 0 : prevCount + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col relative overflow-x-hidden">
      
      <div className="w-full h-screen relative shrink-0">
        
        <Background heroCount={heroCount} />
        
       
        <Hero 
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      
      <div className="w-full relative z-20 bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Product />
        
         <main className="container mx-auto px-4 py-8">
        {/* Policy Section */}
        <section className="mb-12">
          <Policy />
        </section>

        {/* Newsletter Section */}
        <section className="mb-12">
          <Newsletter />
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
      </div>

    </div>
  );
}