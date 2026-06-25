
import { Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Nav from './components/Nav';
import { useContext, useEffect } from 'react';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';




function App() {

  let { userData } = useContext(userDataContext);

  const ProtectedRoute = ({ element }) => {
    
    if (userData === null || userData === false) {
      return <Navigate to="/login" replace />;
    }

    if (userData === undefined) {
      return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }
    return element;
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 antialiased">
       <ScrollToTop /> 
      {userData && <Nav />}
      
      <Routes>
        
        <Route path="/login" element={userData ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={userData ? <Navigate to="/" replace /> : <Signup />} />

        
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/collections" element={<ProtectedRoute element={<Collections />} />} />
        <Route path="/productdetails/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/placeorder" element={<ProtectedRoute element={<PlaceOrder />} />} />
        <Route path="/myorders" element={<ProtectedRoute element={<MyOrders />} />} />


       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;