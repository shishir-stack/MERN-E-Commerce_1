import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPlusCircle, FiList, FiCheckCircle } from 'react-icons/fi';

export default function Sidebar() {
  return (
    
    <div className="w-full md:w-[18%] md:min-w-[200px] bg-slate-950/20 md:bg-transparent border-t-2 md:border-t-0 md:border-r-2 border-[#adebb3]/60 flex flex-row md:flex-col justify-around md:justify-start pt-2 pb-2 md:pb-0 md:pt-8 md:pl-[1.5%] gap-2 md:gap-4 select-none z-50">
      
      {/* ১. Add Items Button */}
      <NavLink 
        to="/add" 
        className={({ isActive }) => `
          flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1.5 md:py-2.5 rounded-md md:rounded-l-md md:rounded-r-none border md:border-y md:border-l border-gray-800 md:border-gray-600 font-medium cursor-pointer transition-all w-auto md:w-full text-center md:text-left
          ${isActive ? 'bg-[#e2f9e5] border-[#adebb3] text-[#00141a]' : 'bg-transparent text-gray-400 hover:text-white border-transparent'}
        `}
      >
        <FiPlusCircle className="text-lg sm:text-xl shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">Add Items</span>
      </NavLink>

      {/* ২. List Items Button */}
      <NavLink 
        to="/lists" 
        className={({ isActive }) => `
          flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1.5 md:py-2.5 rounded-md md:rounded-l-md md:rounded-r-none border md:border-y md:border-l border-gray-800 md:border-gray-600 font-medium cursor-pointer transition-all w-auto md:w-full text-center md:text-left
          ${isActive ? 'bg-[#e2f9e5] border-[#adebb3] text-[#00141a]' : 'bg-transparent text-gray-400 hover:text-white border-transparent'}
        `}
      >
        <FiList className="text-lg sm:text-xl shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">List Items</span>
      </NavLink>

      {/* ৩. View Orders Button */}
      <NavLink 
        to="/orders" 
        className={({ isActive }) => `
          flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-1.5 md:py-2.5 rounded-md md:rounded-l-md md:rounded-r-none border md:border-y md:border-l border-gray-800 md:border-gray-600 font-medium cursor-pointer transition-all w-auto md:w-full text-center md:text-left
          ${isActive ? 'bg-[#e2f9e5] border-[#adebb3] text-[#00141a]' : 'bg-transparent text-gray-400 hover:text-white border-transparent'}
        `}
      >
        <FiCheckCircle className="text-lg sm:text-xl shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">View Orders</span>
      </NavLink>

    </div>
  );
}