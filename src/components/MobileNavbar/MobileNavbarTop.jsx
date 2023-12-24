import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import SearchSuggestion from "../searchSuggestion/SearchSuggestion";
import { useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";
import CreatePostModel from "../modelsSection/CreatePostModel";
import { FaChevronLeft } from "react-icons/fa6";
import QuoraLogo2 from "../../assets/quora-logo-png_4.png"
function MobileNavbarTop(){
 
        const{profile,setSearchVal}=useCurrentContext();
        const [openModal, setOpenModal] = useState(false);
        const[inputValue,setInputValue]=useState('');
        const[searchClicked,setSearchClicked]=useState(false);
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
        setOpenModal(!openModal);
       }
    return(
        <div className={`lg:hidden block w-full fixed box-border top-0 left-0 p-0 right-0 m-0 h-12 border-b border-solid  z-30 ${darkMode?" bg-neutral-900 border-neutral-700":"bg-red-700 border-gray-200"}`}>
            
                <div className="flex justify-between w-full h-full items-center">
                    <div className="box-border px-1.5 ml-2 grid place-items-center relative">
                        <div className="flex gap-1 text-white" onClick={()=>setSearchClicked(true)}>
                            <div className="flex items-center">
                                <IoSearch className="text-xl"/>
                            </div>
                            <div className="flex w-full box-border font-medium">
                                <div>Search</div>
                            </div>                   
                        </div>
                        
                    </div>
                    <div className="box-border w-full grid place-items-center pr-2">
                    <Link to='/'><img
                    src={QuoraLogo2}
                    alt="logo"
                    className=" w-22 h-6"         
                    />  </Link>   
                    </div> 
                    <div className="box-border px-1.5 mr-2 grid place-items-center text-white">
                        <div className="flex gap-1" onClick={handleOpenModel}>
                            <div className=" h-8 flex justify-center items-center cursor-pointer"><BiPlusCircle className="text-xl" /></div>
                            <button onClick={handleOpenModel} className="box-border h-8 flex justify-center items-center text-center text-base text-white font-medium">Add</button>                       
                            <CreatePostModel onClickModel={handleOpenModel} value={openModal}/>
                        </div>
                    </div>
                    {searchClicked&&
                    <div className="w-full absolute mt-0 z-50 h-12 bg-red-600">
                        <div className="flex px-2 gap-2 justify-center items-center h-full">
                            <div onClick={()=>setSearchClicked(false)}>
                                <FaChevronLeft className="text-white"/>
                            </div>
                            <div className="w-full pr-2 ">
                                <div className="flex px-2 bg-slate-950/40 rounded">
                                    <div className="flex items-center mr-1">
                                        <IoSearch className="w-4 h-4"/>
                                    </div>
                                    <div className="flex w-full box-border">
                                        <input type="text" placeholder="Search Quora" value={inputValue} 
                                            onChange={(e)=>setInputValue(e.target.value)}
                                            onKeyDown={handleKeyPress}  
                                            
                                            className={`box-border w-full shadow-none bg-transparent h-7 text-[13px] outline-none border-none overflow-hidden text-ellipsis ${darkMode?"text-zinc-300":"text-black"} `}     
                                        />
                                    </div>        
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    }
                </div>
            {/* {searchClicked&&
                 <SearchSuggestion onClickModel={handleSearchClicked} value={searchClicked} input={inputValue}/>
            } */}
        </div>
        
    )
}
export default MobileNavbarTop;