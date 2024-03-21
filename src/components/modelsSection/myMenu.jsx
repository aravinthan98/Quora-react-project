import React from "react";
import { useCurrentContext } from "../../context/currentContext";
import { BiMessageDots } from "react-icons/bi";
import {LiaBullhornSolid} from 'react-icons/lia';
import {FiDollarSign} from 'react-icons/fi';
import { RiBarChartFill, RiDraftLine } from "react-icons/ri";
import { PiBookmarks } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
function MyMenu({onMenuValue}){
   
    const{profile,setLogin}=useCurrentContext();
    const navigate=useNavigate();
    const handleLogout=()=>{    
        localStorage.clear();
        setLogin(false)
        return navigate('/login')       
    }
    // const handleCloseMenu=()=>{
    //     console.log(onMenuValue)
    //     onMenuValue();
    // }
    return(
      
        <div className="bg-white border-slate-300 text-zinc-800 dark:bg-neutral-800 dark:border-zinc-700 dark:text-zinc-300 w-64 z-30 absolute lg:top-14 lg:h-auto h-screen border  border-solid">
            <div>
                <div className=" border-b border-solid border-slate-300"> 
                    <Link to="/myprofile" state={`${profile.id}`}><div className=" px-4 py-2 cursor-pointer box-border " >
                        <div className=" w-10 h-10 bg-green-500 text-white rounded-full text-center text-3xl flex justify-center items-center">
                        <div className="mb-1">{profile.userName[0].toUpperCase()}</div>
                        </div>
                        <div className=" text-xl font-bold">{profile.userName}</div>
                    </div></Link>
                </div>
                <div className="border-b border-solid border-slate-300 ">
                    <div className="py-2">
                        <Link to='/commingsoon'>
                            <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                                <div className="flex items-center text-xl"><BiMessageDots /></div>
                                <div className="text-sm">Messages</div>
                            </div>
                        </Link>
                        <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                            
                            <div className="flex items-center text-xl"><LiaBullhornSolid/></div>
                            <a href="https://business.quora.com/" target="_blank" className="text-sm">Create Ad</a>
                        </div>
                        <Link to='/commingsoon'>
                        <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                            <div className="flex items-center text-xl"><FiDollarSign/></div>
                            <div className="text-sm">Monetization</div>
                        </div>
                        </Link>
                        <Link to='/commingsoon'>
                        <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                            <div className="flex items-center text-xl"><RiBarChartFill/></div>
                            <div className="text-sm">Your content & stats</div>
                        </div>
                        </Link>
                        <Link to='/commingsoon'>
                            <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                                <div className="flex items-center text-xl"><PiBookmarks /></div>
                                <div className="text-sm">Bookmarks</div>
                            </div>
                        </Link>
                        <Link to='/commingsoon'>
                        <div className="py-2 px-3 flex gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                            <div className="flex items-center text-xl"><RiDraftLine /></div>
                            <div className="text-sm">Draft</div>
                        </div>
                        </Link>
                  
                    </div>
                </div>
                <div className="border-b border-solid border-slate-300">
                    <div className=" text-[13px] py-1">
                        <div>
                           <ThemeSwitcher/>                                                 
                        </div>
                        <div className="py-1 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                            Settings
                        </div>
                        <div className="py-1 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={onMenuValue}>
                           <a href="https://help.quora.com/hc/en-us" target="_blank">Help</a>
                        </div>
                        <div className="py-1 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                         onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </div>
                <div>
                    <div className="py-3 text-sm flex flex-wrap bg-gray-50 text-slate-400 dark:bg-zinc-900 dark:text-zinc-400">
                        <span className="px-2"><a href="https://www.quora.com/about">About</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.careers.quora.com/">Careers</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/about/tos">Terms</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/about/privacy">Privacy</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/about/acceptable_use">Acceptable Use</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://business.quora.com/">Businesses</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/press">Press</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/about/your_ad_choices">Your Ad choices</a></span>
                        <span className="before:content-['·'] px-2"><a href="https://www.quora.com/about/grievance">Grievance Officer</a></span>            
                    </div>
                </div>
            </div>

        </div>
  
    )

}
export default MyMenu;