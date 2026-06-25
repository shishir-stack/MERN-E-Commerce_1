// components/Nav.jsx
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, ShoppingCart, UserCircle2, X, Menu } from 'lucide-react';

// Context ইমপোর্ট
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { cartDataContext } from '../context/CartContext'; // 👈 CartContext ইমপোর্ট

export default function Nav() {
  let { getCurrentUser, userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { search, setSearch, showSearch, setShowSearch } = useContext(shopDataContext);
  let { cartCount } = useContext(cartDataContext); // 👈 CartContext থেকে cartCount নিন
  
  let [showProfile, setShowProfile] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  let navigate = useNavigate();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/auth/logout", 
        { withCredentials: true }
      );
      console.log(result.data);
      
      setShowProfile(false);
      setMobileMenu(false);

      if (typeof setUserData === 'function') {
        setUserData(null);
      }

      await getCurrentUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
      if (typeof setUserData === 'function') {
        setUserData(null);
      }
      setShowProfile(false);
      navigate('/login');
    }
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
        setMobileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative z-50">
      
      <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[15px] md:px-[30px] shadow-md shadow-black/30">
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMobileMenu(!mobileMenu)} 
            className="md:hidden p-1 text-black hamburger-btn focus:outline-none"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-[#46A3B1] p-1.5 rounded-lg text-white">
              <ShoppingCart className="w-[18px] h-[18px] md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-800">OneCart</span>
          </div>
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center justify-center gap-[15px] lg:gap-[19px] text-white">
            <li onClick={() => navigate('/')} className="text-[14px] lg:text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[15px] lg:px-[20px] rounded-2xl whitespace-nowrap">HOME</li>
            <li onClick={() => navigate('/collections')} className="text-[14px] lg:text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[15px] lg:px-[20px] rounded-2xl whitespace-nowrap">COLLECTIONS</li>
            <li onClick={() => navigate('/about')} className="text-[14px] lg:text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[15px] lg:px-[20px] rounded-2xl whitespace-nowrap">ABOUT</li>
            <li onClick={() => navigate('/contact')} className="text-[14px] lg:text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[15px] lg:px-[20px] rounded-2xl whitespace-nowrap">CONTACT</li>
          </ul>
        </div>

        <div className="flex items-center gap-[12px] md:gap-[20px] text-black">
          {/* সার্চ বাটন */}
          <button 
            onClick={() => {
              setShowSearch(!showSearch);
              if (!showSearch) {
                navigate('/collections');
              }
            }} 
            className="p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            {showSearch ? <X className="w-5 h-5 md:w-6 h-6" /> : <Search className="w-5 h-5 md:w-6 h-6" />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowProfile(!showProfile)} className="focus:outline-none block">
              {userData ? (
                <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer uppercase">
                  {userData?.name?.slice(0, 1)}
                </div>
              ) : (
                <UserCircle2 className="w-[26px] h-[26px] md:w-[29px] md:h-[29px] text-[#000000] cursor-pointer" />
              )}
            </button>

            {/* প্রোফাইল ড্রপডাউন মেনু */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-xl shadow-lg border border-neutral-800 py-2">
                <ul className="flex flex-col text-sm">
                  {!userData ? (
                    <li 
                      onClick={() => { navigate("/login"); setShowProfile(false); }} 
                      className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                    >
                      Login
                    </li>
                  ) : (
                    <li 
                      onClick={handleLogout} 
                      className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer text-red-400"
                    >
                      LogOut
                    </li>
                  )}
                  <li onClick={() => { navigate('/myorders'); setShowProfile(false); }} className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">Orders</li>
                  <li onClick={() => { navigate('/about'); setShowProfile(false); }} className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">About</li>
                </ul>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate('/cart')} 
            className="relative p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div 
        ref={mobileMenuRef}
        className={`fixed top-[70px] left-0 w-full bg-[#ecfafa] shadow-md transition-all duration-300 ease-in-out overflow-hidden md:hidden z-10 ${mobileMenu ? 'max-h-60 border-t border-black/10 py-3' : 'max-h-0'}`}
      >
        <ul className="flex flex-col space-y-2 px-4 text-white">
          {['HOME', 'COLLECTIONS', 'ABOUT', 'CONTACT'].map((item) => (
            <li
              key={item}
              onClick={() => {
                if (item === 'HOME') {
                  navigate('/');
                } else if (item === 'COLLECTIONS') {
                  navigate('/collections'); 
                } else {
                  navigate(`/${item.toLowerCase()}`);
                }
                setMobileMenu(false);
              }}
              className="text-center text-[15px] font-semibold bg-[#000000c9] hover:bg-slate-700 py-[10px] rounded-xl cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* সার্চ বার প্যানেল */}
      <div className={`fixed top-[70px] left-0 w-full bg-[#C2DBD8] transition-all duration-300 ease-in-out overflow-hidden z-0 ${showSearch ? 'max-h-20 opacity-100 py-3' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative flex items-center">
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text" 
              placeholder="Search Here" 
              className="w-full bg-[#1E2E2A] text-white placeholder-slate-400 pl-6 pr-20 py-2.5 rounded-full text-sm focus:outline-none" 
              autoFocus={showSearch} 
            />
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {search && (
                <X 
                  onClick={() => setSearch('')} 
                  className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white"
                />
              )}
              <Search className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[70px]"></div>
    </nav>
  );
}