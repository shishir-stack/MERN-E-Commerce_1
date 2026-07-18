import React, { createContext } from 'react';

export const AuthDataContext =createContext(null);

export function AuthContext({ children }) {
  const serverUrl = "https://mern-e-commerce-1-z7y9.onrender.com";

  const value = {
    serverUrl
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}