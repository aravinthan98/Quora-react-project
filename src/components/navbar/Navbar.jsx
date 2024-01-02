import React, { useState } from "react";
import {BiSolidHome} from 'react-icons/bi';
import {IoIosListBox} from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import {SlNote} from 'react-icons/sl';
import {IoNotificationsOutline} from 'react-icons/io5';
import {GoSearch} from 'react-icons/go'
import {MdOutlineLanguage} from 'react-icons/md';
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import { HiUserGroup } from "react-icons/hi";
import { PiCaretDown } from "react-icons/pi";
import CreatePostModel from "../modelsSection/CreatePostModel";
import SearchSuggestion from "../searchSuggestion/SearchSuggestion";
import MyMenu from "../modelsSection/myMenu";
import { useSelector } from "react-redux";
import LanguageSection from "../modelsSection/LanguageSection";


 const Navbar = () => {
 
  const{profile,setSearchVal}=useCurrentContext();
  const [openModal, setOpenModal] = useState(false);
  const[inputValue,setInputValue]=useState('');
  const[searchClicked,setSearchClicked]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[menuClicked,setMenuClicked]=useState('Home')
  const[langClicked,setLangClicked]=useState(false)
  const{darkMode}=useSelector((state)=>state.mode)
  const navigate=useNavigate();
  
  const handleSearchClicked=()=>{
    setSearchClicked(false);
  }
 const handleKeyPress=(event)=>{
  if(event.key==='Enter'){
    setSearchVal(event.target.value);
    setSearchClicked(false);
    return navigate('/search_results')
  }
 }

 const handleOpenModel=()=>{
  setOpenModal(true);
 }
 const handleCloseModel=()=>{
  setOpenModal(false);
 
 }
 const handleMyMenuClose=()=>{
    setMenuOpen(false);
 }
  return (
    <div className={`lg:w-full lg:block hidden fixed box-border top-0 left-0 right-0 h-[50px] border-b border-solid shadow-sm z-30 ${darkMode?" bg-neutral-800 border-neutral-700":"bg-[#fff] border-gray-200"}`}>
      <div className=" w-10/12 mx-auto box-border h-[50px] text-zinc-800 ">
        <div className="w-full h-full flex box-border">
        <div className="mr-6 flex items-center w-24">
        <Link to='/'><img
              src="https://seeklogo.com/images/Q/quora-logo-2E2DD559F2-seeklogo.com.png"
              alt="logo"
              className=" w-22 h-6"         
              />  </Link>   
        </div> 
        <div className={`box-border flex h-full  items-center w-full ${darkMode?" text-neutral-400":"text-zinc-500"}`}>
          <Link to='/'><div className={`px-2 w-15 flex justify-center items-center h-10 rounded ${darkMode?`hover:bg-zinc-700 hover:text-red-500 ${menuClicked==='Home'?"text-red-600":"text-neutral-400"}`:`hover:bg-gray-100 hover:text-red-800 ${menuClicked==='Home'?"text-red-700":"text-neutral-500"}`}`} 
            onClick={()=>setMenuClicked('Home')}>
            <BiSolidHome className="w-7 h-7" />
          
          </div></Link>
          <Link to="following"><div className={`px-2 w-15 flex justify-center items-center h-10 rounded ${darkMode?`hover:bg-zinc-700 hover:text-red-500 ${menuClicked==='following'?"text-red-600":"text-neutral-400"}`:`hover:bg-gray-100 hover:text-red-800 ${menuClicked==='following'?"text-red-700":"text-neutral-500"}`}`}
          onClick={()=>setMenuClicked('following')}>
            <IoIosListBox className="w-7 h-7"/>       
          </div>
          </Link> 
          <Link to='/answer'><div className={`px-2 w-15 flex justify-center items-center h-10 rounded ${darkMode?`hover:bg-zinc-700 hover:text-red-500 ${menuClicked==='question'?"text-red-600":"text-neutral-400"}`:`hover:bg-gray-100 hover:text-red-800 ${menuClicked==='question'?"text-red-700":"text-neutral-500"}`}`}
          onClick={()=>setMenuClicked('question')}>
            <SlNote className="w-7 h-7"/>          
          </div></Link>
          <Link to='/spaces'> <div className={`px-2 w-15 flex justify-center items-center h-10 rounded ${darkMode?`hover:bg-zinc-700 hover:text-red-500 ${menuClicked==='spaces'?"text-red-600":"text-neutral-400"}`:`hover:bg-gray-100 hover:text-red-800 ${menuClicked==='spaces'?"text-red-700":"text-neutral-500"}`}`}
          onClick={()=>setMenuClicked('spaces')}>
            <HiUserGroup className="w-7 h-7" />
          </div></Link>
          <Link to='/notifications'><div className={`px-2 w-15 flex justify-center items-center h-10 rounded ${darkMode?`hover:bg-zinc-700 hover:text-red-500 ${menuClicked==='notify'?"text-red-600":"text-neutral-400"}`:`hover:bg-gray-100 hover:text-red-800 ${menuClicked==='notify'?"text-red-700":"text-neutral-500"}`}`}
          onClick={()=>setMenuClicked('notify')}>
            <IoNotificationsOutline className="w-7 h-7"/>          
          </div></Link>
          <div className="box-border mx-2 w-full relative">
            <div className={`flex z-0 px-2 py-1  rounded border border-solid shadow-blue-400  ${darkMode?" bg-neutral-900 border-zinc-600 text-slate-100":"bg-[#fff] border-zinc-200 text-slate-400"}`}>
              <div className="flex items-center mr-1">
              <GoSearch className="w-4 h-4"/>
              </div>
              <div className="flex w-full box-border">
              <input type="text" placeholder="Search Quora" value={inputValue} 
              onChange={(e)=>setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}  
              onClick={()=>setSearchClicked(true)}
              className={`box-border w-full shadow-none bg-transparent h-6 text-[13px] outline-none border-none overflow-hidden text-ellipsis ${darkMode?"text-zinc-300":"text-black"} `}     
              />
              </div>
            </div>
            {searchClicked&&
            <SearchSuggestion onClickModel={handleSearchClicked} value={searchClicked} input={inputValue}/>
            }
          </div>

          <div className={searchClicked?" hidden":"flex"}>
          <Link to='/commingsoon' className="flex items-center justify-center"><div className="flex items-center justify-center">
            <div className={`box-border px-4 mx-2 h-8 flex justify-center whitespace-nowrap items-center rounded-full bg-transparent border border-solid font-medium text-[13px] ${darkMode?" border-zinc-700":"border-slate-200"}`}>
              
                Try Quora+    
            </div>
          </div>
          </Link>
          <div className={`box-border h-10 px-2 flex justify-center cursor-pointer items-center rounded ${darkMode?"hover:bg-zinc-700":"hover:bg-gray-100"}`} onClick={()=>setMenuOpen(!menuOpen)}>
       
            <div className="w-7 h-7 font-semibold border border-solid border-blue-800 bg-green-800 text-white rounded-full text-center text-lg flex justify-center items-center">
              <div className="">{profile.userName[0].toUpperCase()}</div>
            </div>
              {menuOpen&&
              <MyMenu onMenuValue={handleMyMenuClose}/>
              }
          </div>

          <div className={`box-border h-10 px-2 flex justify-center  items-center rounded  ${darkMode?"hover:bg-zinc-700 text-zinc-400":"hover:bg-gray-100 text-zinc-500"}`}
          onClick={()=>setLangClicked(!langClicked)}>
            <MdOutlineLanguage className="w-7 h-7" />
            {langClicked&&
              
              <LanguageSection/>
              
            }
          </div>
          </div>
          <div className="flex ml-2 box-border rounded-full bg-red-700 text-white ">
          <button onClick={handleOpenModel} className="box-border h-8 px-2.5 ml-1  flex justify-center items-center text-center  text-[13px] font-medium whitespace-nowrap">Add Question</button>
          <div className=" h-8 border-r border-solid border-red-800"></div>
          <div className="pl-2 pr-2 h-8 flex justify-center items-center cursor-pointer" onClick={handleOpenModel}><PiCaretDown className="w-5 h-5" /></div>
          </div>
          <CreatePostModel onClickModel={handleCloseModel} value={openModal}/>
        </div>
        </div>
        </div>
        {searchClicked&&
          //  <SearchSuggestion onClickModel={handleSearchClicked} value={searchClicked} input={inputValue}/>
          <div className=" w-full h-screen absolute bg-zinc-800 bg-opacity-90 " onClick={()=>setSearchClicked(false)}>

          </div>
        }

      </div>
  );
};

export default Navbar;
