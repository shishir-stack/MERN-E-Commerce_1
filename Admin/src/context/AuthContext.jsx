import React, { createContext } from 'react';

export const AuthDataContext =createContext(null);

export function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";

  const value = {
    serverUrl
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}