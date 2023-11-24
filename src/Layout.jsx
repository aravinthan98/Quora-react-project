import React from 'react'
import './Layout.css'
import Navbar from './components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useCurrentContext } from './context/currentContext';
import Login from './components/login/Login';
const Layout = ({ children }) => {
  const{login}=useCurrentContext();
  const {pathname}=useLocation();
  return (
    <>
    {login?
    (<div className='layout'>
      {!pathname.includes('login')&&
        <Navbar/>
      }
      
        {children}
        

    </div>):(<Login/>)
    }
    </>
  )
}

export default Layout