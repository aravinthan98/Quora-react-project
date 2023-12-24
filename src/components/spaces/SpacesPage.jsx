
import React, { useState } from "react";
import './spacesPage.scss';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegCompass} from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';
import DiscoverSpaces from "../discoverSpaces/DiscoverSpaces";
import { Modal } from "@mui/base";
import { RxCross2 } from "react-icons/rx";
import CreateSpaceModel from "../modelsSection/CreateSpaceModel";
import { useSelector } from "react-redux";

function Spaces(){
    const[openModal,setOpenModal]=useState(false);
    const{darkMode}=useSelector((state)=>state.mode)
    const handleModel=()=>{
        setOpenModal(!openModal);
    }
    return(
        <div className={` ${darkMode?"bg-neutral-900 text-zinc-300":"bg-gray-100"}`}>
        <div className={`flex box-border lg:w-98 lg:mt-8 mt-20 w-full mx-auto pt-8 items-stretch gap-8 font-sans ${darkMode?"bg-neutral-900 text-zinc-300":"bg-gray-100"}`}>
            <div className="space-container lg:w-3/4 w-full">
                <div className={`space-top-sec border border-solid  ${darkMode?"bg-neutral-800 border-zinc-700":"bg-white border-gray-300"}`}>
                    <h3>Welcome to Spaces!</h3>
                    <p>Follow Spaces to explore your interests on Quora.</p>
                    <div className="space-top-sec-btns">
                            <div className="space-create-space-btn space-flex">
                                <AiOutlinePlusCircle/>
                                <h4 onClick={()=>setOpenModal(true)} className="cursor-pointer whitespace-nowrap">Create a Space</h4>
                            </div>
                            <div className="space-discover-space-btn space-flex">
                                <FaRegCompass/>
                                <h4><a href="#discoverSpaces" className="whitespace-nowrap">Discover Spaces</a></h4>
                            </div>
                    </div>

                </div>
                <CreateSpaceModel onModelClick={handleModel} value={openModal}/>
                <div>
                    <DiscoverSpaces/>
                </div>
            </div>
            <div className={`lg:block hidden space-right-container border border-solid  ${darkMode?"bg-neutral-800 border-zinc-700":"bg-white border-gray-300"}`}>
                <div className={`space-right-bar-title font-medium ${darkMode?"text-zinc-300":"text-slate-700"}`}>Pending Invites</div>
                <div className="space-right-content flex justify-center">
                    <div className="space-right-content-noinvite flex flex-col justify-center items-center">
                        <AiOutlineMail className="font-medium text-slate-400 text-xl"/>
                        <div className=" text-sm font-medium text-slate-400">No Invites</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Spaces;