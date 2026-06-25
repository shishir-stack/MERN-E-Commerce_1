import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { AuthDataContext } from './../context/AuthContext';

export default function Lists() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  
  const fetchList = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/product/list"); 
      if (response.data.success) {
        setList(response.data.product); 
        console.log(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      if (response.data.success) {
        await fetchList(); 
        console.log(response);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-hidden flex flex-col">
      <Nav />
      <hr className="border-slate-800" />

      
      <div className="flex flex-col md:flex-row flex-1 w-full h-[calc(100vh-80px)] overflow-hidden">
        <Sidebar />

       
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-black/10 text-gray-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-5 text-white text-center sm:text-left">
              All Listed Products
            </h2>

            
            <div className="flex flex-col gap-2 w-full">
              
              
              <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2.5 px-4 bg-slate-900 border border-slate-800 text-sm font-semibold rounded shadow">
                <span>Image</span>
                <span>Name</span>
                <span>Category</span>
                <span>Price</span>
                <span className="text-center">Action</span>
              </div>

              
              {list && list.length > 0 ? (
                list.map((item) => (
                  <div 
                    key={item._id} 
                    className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 sm:gap-4 py-3 px-3 sm:px-4 border border-slate-800 bg-slate-950/40 rounded-lg md:rounded hover:bg-slate-900/60 transition-all text-xs sm:text-sm"
                  >
                    
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 flex-shrink-0 bg-white rounded overflow-hidden flex items-center justify-center">
                      <img 
                        src={item.image1} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                   
                    <div className="flex flex-col min-w-0">
                      <p className="font-medium text-white truncate pr-2 text-sm sm:text-base md:text-sm">
                        {item.name}
                      </p>
                      
                      
                      <div className="flex items-center gap-2 mt-1 md:hidden text-[11px] text-gray-400">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-gray-300">
                          {item.category}
                        </span>
                        <span className="font-semibold text-emerald-400">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>

                    
                    <p className="hidden md:block text-gray-400">{item.category}</p>

                    
                    <p className="hidden md:block font-semibold text-emerald-400">₹{item.price}</p>

                    
                    <div className="flex justify-end md:justify-center items-center">
                      <button 
                        onClick={() => removeProduct(item._id)} 
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 font-bold w-8 h-8 sm:w-9 sm:h-9 md:w-auto md:h-auto flex items-center justify-center rounded-full cursor-pointer select-none text-sm sm:text-base transition-all active:scale-95"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-12 bg-slate-950/20 border border-dashed border-slate-800 rounded-lg">
                  <p className="text-sm sm:text-base">No products found.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}