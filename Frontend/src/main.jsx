// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'
import CartContext from './context/CartContext.jsx'
// import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <AuthContext>
   <UserContext> 
    <ShopContext>
      <CartContext>
    <App />
      </CartContext>
    </ShopContext>
   </UserContext>
  </AuthContext>
  </BrowserRouter>,
)
