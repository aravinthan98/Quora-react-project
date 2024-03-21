import React from 'react'
import Navbar from './components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useCurrentContext } from './context/currentContext';
import Login from './components/login/Login';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import MobileNavbarTop from './components/MobileNavbar/MobileNavbarTop';
const Layout = ({ children }) => {
  const{login}=useCurrentContext();
  const {pathname}=useLocation();
  return (
    <>
    {login?
    (<div className='w-full'>
      {!pathname.includes('login')&&
        <>
        <Navbar/>
        <MobileNavbarTop/>
        <MobileNavbar/>
        </>        
      }      
        {children}
    </div>):(<Login/>)
    }
    </>
  )
}

export default Layout