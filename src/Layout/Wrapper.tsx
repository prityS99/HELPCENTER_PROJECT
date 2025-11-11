import React from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Outlet } from 'react-router-dom';


const Wrapper = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Wrapper
