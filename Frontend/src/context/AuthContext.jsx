// context/AuthContext.jsx
import { createContext } from 'react';

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
    let serverUrl = 'https://mern-e-commerce-1-ghee.onrender.com';

    let value = {
        serverUrl
    };

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    );
};

export default AuthContext;
