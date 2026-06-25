import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext'; 

export const shopDataContext = createContext();

function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState('');
  let [showSearch, setShowSearch] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let currency = '$';
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      
      if (result.data && result.data.success) {
        setProducts(result.data.product); 
        console.log(result.data);
        
      } else if (result.data) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      getProducts();
    }
  }, [serverUrl]);

  let value={ products, setProducts, currency, delivery_fee, getProducts,search, setSearch,showSearch,setShowSearch}
  return (
    <shopDataContext.Provider value={value }>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;