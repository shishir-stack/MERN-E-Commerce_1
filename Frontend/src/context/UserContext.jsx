import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';



export const userDataContext = createContext()

function UserContext({children}) {
    let [userData,setUserData]=useState("")
    let {serverUrl}=useContext(authDataContext);

   const getCurrentUser = async () => {
    try {
        const result = await axios.post(serverUrl + '/api/user/getcurrentuser', {}, { withCredentials: true });
        setUserData(result.data);
        console.log(result);
    } catch (error) {
        setUserData(null);
       
        if (error.response) {
            console.error("Backend Sent This Error:", error.response.data);
        } else {
            console.error("Frontend Axios Error:", error.message);
        }
    }
};

    useEffect(()=>{
        getCurrentUser()
    },[]);

    let value={
        userData,setUserData,getCurrentUser
    };

   
  return (
    <div>
      <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
