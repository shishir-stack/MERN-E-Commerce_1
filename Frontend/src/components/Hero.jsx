import React from 'react';
import { FaCircle } from 'react-icons/fa'; 

export default function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    
    <div className="relative w-full min-h-screen select-none flex flex-col justify-between pt-[20%] md:pt-[25%] pb-[10%] px-[5%] md:px-[8%]">
      
      
      <div className="text-[#88d9ee] text-[14px] sm:text-[20px] md:text-[34px] lg:text-[48px] font-bold max-w-[40%] break-words whitespace-normal leading-tight pointer-events-none">
        <p className="drop-shadow-md">{heroData?.text1}</p>
        <p className="drop-shadow-md mt-2 text-white md:text-[#88d9ee]">{heroData?.text2}</p>
      </div>

     
      <div className="flex items-center justify-start gap-[6px] md:gap-[12px] z-30 mt-10 md:mt-20">
        {[0, 1, 2, 3].map((index) => (
          <FaCircle 
            key={index}
            className={`w-[6px] h-[6px] sm:w-[10px] sm:h-[10px] md:w-[14px] md:h-[14px] cursor-pointer transition-all duration-300 transform hover:scale-125 ${
              heroCount === index ? "text-orange-400 scale-110" : "text-white/40"
            }`} 
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>

    </div>
  );
}