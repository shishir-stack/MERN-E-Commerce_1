import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Lists from './pages/Lists'
import Add from './pages/Add'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { AdminDataContext } from './context/AdminContext';

const App = () => {
  let {adminData}= useContext(AdminDataContext)
  return (
    <>
    {!adminData ? <Login/> : <>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/add" element={<Add />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
    </Routes>
    </>
    }
    </>
  )
}

export default App
