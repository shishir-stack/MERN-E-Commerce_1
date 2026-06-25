import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from './../context/AuthContext';
import { AdminDataContext } from './../context/AdminContext';

function Nav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(AdminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-4 bg-slate-950 text-white h-[80px] border-b border-slate-900">
      <div className="font-bold text-lg sm:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
        OneCart Admin
      </div>
      <button 
        onClick={logOut} 
        className="bg-red-600/90 hover:bg-red-600 text-white text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded font-semibold transition-all active:scale-95 cursor-pointer shadow-md shadow-red-900/20"
      >
        Logout
      </button>
    </div>
  );
}

export default Nav;