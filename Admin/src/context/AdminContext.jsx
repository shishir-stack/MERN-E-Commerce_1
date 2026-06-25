import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext';


export const AdminDataContext = createContext(null);

export function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  const getAdmin = async () => {
    if (!serverUrl) return; 
    
    try {
      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true,
      });

      setAdminData(result.data);
      console.log("Admin Data Fetched:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error("Failed to fetch admin data:", error);
    }
  };


  useEffect(() => {
    getAdmin();
  }, [serverUrl]);

  const value = {
    adminData,setAdminData,getAdmin,
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}