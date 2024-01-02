import React, { useState } from "react";
import {BiSolidHome} from 'react-icons/bi';
import {IoIosListBox} from 'react-icons/io';
import {SlNote} from 'react-icons/sl';
import {IoNotificationsOutline} from 'react-icons/io5';
import {MdOutlineLanguage} from 'react-icons/md';
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import { HiUserGroup } from "react-icons/hi";
import MyMenu from "../modelsSection/myMenu";
import { useSelector } from "react-redux";
import LanguageSection from "../modelsSection/LanguageSection";
import { RxCross1 } from "react-icons/rx";

 const MobileNavbar = () => {
  const{profile,setSearchVal}=useCurrentContext();
  const[searchClicked,setSearchClicked]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[menuClicked,setMenuClicked]=useState('Home')
  const[langClicked,setLangClicked]=useState(false)
  const{darkMode}=useSelector((state)=>state.mode)
  const handleMyMenu=()=>{
    setMenuOpen(false);
  }
  return (
    <div className={`lg:hidden block w-full fixed box-border top-12 left-0 right-0 mx-0 p-0 h-[50px] border-b border-solid shadow-sm z-30 ${darkMode?" bg-neutral-900 border-neutral-700":"bg-gray-100 border-gray-200"}`}>
      <div className=" mx-auto  w-full box-border h-[50px] text-zinc-800 ">
        <div className="w-full h-full flex box-border ">
          <div className={`box-border flex h-full px-2 items-center w-full ${darkMode?" text-neutral-400":"text-zinc-500"}`}>
            <div className={`w-full h-[50px] border-r grid place-items-center border-solid ${darkMode?"border-zinc-700":"border-zinc-300"}`}>
            <Link to='/'><div className={`flex justify-center  w-full items-center h-10 rounded ${darkMode?`hover:text-red-500  ${menuClicked==='Home'?"text-red-600":"text-neutral-400"}`:`hover:text-red-800 ${menuClicked==='Home'?"text-red-700":"text-neutral-500"}`}`} 
              onClick={()=>setMenuClicked('Home')}>
              <BiSolidHome className="w-7 h-7 " />
            </div></Link>
          </div>
          <div className={`w-full h-[50px] border-r grid place-items-center border-solid ${darkMode?"border-zinc-700":"border-zinc-300"}`}>
            <Link to="following"><div className={`flex justify-center items-center w-full h-10 rounded ${darkMode?`hover:text-red-500 ${menuClicked==='following'?"text-red-600":"text-neutral-400"}`:`hover:text-red-800 ${menuClicked==='following'?"text-red-700":"text-neutral-500"}`}`}
            onClick={()=>setMenuClicked('following')}>
              <IoIosListBox className="w-7 h-7"/>       
            </div>
            </Link> 
          </div>
          <div className={`w-full h-[50px] border-r grid place-items-center border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>
            <Link to='/answer'><div className={`flex justify-center items-center w-full h-10 rounded ${darkMode?`hover:text-red-500 ${menuClicked==='question'?"text-red-600":"text-neutral-400"}`:` hover:text-red-800 ${menuClicked==='question'?"text-red-700":"text-neutral-500"}`}`}
            onClick={()=>setMenuClicked('question')}>
              <SlNote className="w-7 h-7"/>          
            </div></Link>
          </div>
          <div className={`w-full h-[50px] border-r grid place-items-center border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>
            <Link to='/spaces'> <div className={`flex justify-center items-center w-full h-10 rounded ${darkMode?` hover:text-red-500 ${menuClicked==='spaces'?"text-red-600":"text-neutral-400"}`:` hover:text-red-800 ${menuClicked==='spaces'?"text-red-700":"text-neutral-500"}`}`}
            onClick={()=>setMenuClicked('spaces')}>
              <HiUserGroup className="w-7 h-7" />
            </div></Link>
          </div>
            <div className={`w-full h-[50px] border-r grid place-items-center border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>
            <Link to='/notifications'><div className={`box-border h-10 flex justify-center cursor-pointer items-center w-full rounded ${darkMode?` hover:text-red-500 ${menuClicked==='notify'?"text-red-600":"text-neutral-400"}`:` hover:text-red-800 ${menuClicked==='notify'?"text-red-700":"text-neutral-500"}`}`}
            onClick={()=>setMenuClicked('notify')}>
             
              <IoNotificationsOutline className="w-7 h-7"/>
                        
            </div></Link>
            </div >
            <div className={`w-full h-[50px] grid place-items-center border-r border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>
            <div className={`box-border h-10 flex justify-center cursor-pointer items-center w-full rounded `} onClick={()=>setMenuOpen(!menuOpen)}>      
              <div className="w-7 h-7 font-semibold border border-solid border-blue-800 bg-green-800 text-white rounded-full text-center text-lg flex justify-center items-center">
                <div className="">{profile.userName[0].toUpperCase()}</div>
              </div>
                 
            </div>
            </div>
            <div className={`w-full h-[50px] grid place-items-center`}>
            <div className={`box-border h-10 flex justify-center cursor-pointer items-center w-full rounded  ${darkMode?"text-zinc-400":"text-zinc-500"}`}
              onClick={()=>setLangClicked(!langClicked)}>
              <MdOutlineLanguage className="w-7 h-7" />
              {langClicked&&             
                <LanguageSection/>              
              }
            </div>
            </div>
          </div>
        </div>
      </div>
        {searchClicked&&
          //  <SearchSuggestion onClickModel={handleSearchClicked} value={searchClicked} input={inputValue}/>
          <div className=" w-full h-screen absolute bg-zinc-800 bg-opacity-90 " onClick={()=>setSearchClicked(false)}>

          </div>
        }
         {menuOpen&&
          <div className="w-full h-screen z-50 -top-12 absolute bg-neutral-950/80">
            <div className="w-64 z-50 " >
              <div className={`flex  w-full h-9 pl-4 pr-2 border-r border-solid justify-between items-center 
              ${darkMode?"text-zinc-200 border-zinc-600 bg-neutral-900":"bg-white text-neutral-700 border-zinc-300"}`} onClick={(e)=>e.stopPropagation()}>
                <div>Your Account</div>
                <div  onClick={()=>setMenuOpen(false)}><RxCross1 /></div>
              </div>
            <MyMenu onMenuValue={handleMyMenu}/>
            </div>
          </div>
          }

      </div>
  );
};

export default MobileNavbar;
