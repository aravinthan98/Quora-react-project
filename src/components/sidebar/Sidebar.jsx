
import {VscDiffAdded} from 'react-icons/vsc'
import React, { useEffect, useState } from "react";
import { useCurrentContext } from "../../context/currentContext";
import "./Sidebar.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateSpaceModel from '../modelsSection/CreateSpaceModel';
import Footer from '../Footer/Footer';
const Sidebar = () => {
  const[openModal,setOpenModal]=useState(false);
  const{profile,selectedSpace,setSelectedSpace}=useCurrentContext();
  const[channelData,setChannelData]=useState([]);
  
  const dpArray=["https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_gray.png-26-a461963c75474740.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_yellow.png-26-fe83a11d61dd4889.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_green.png-26-4020b62698aa9121.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_blue.png-26-59bea7960fef2c75.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_pink.png-26-b775bb30fc463837.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_purple.png-26-6ea9822273dc841e.png"]

const getSpaces=async()=>{
  try {
    const response = await axios.get('https://academics.newtonschool.co/api/v1/quora/channel?limit=10', {
      headers: {
        'projectID': 'f104bi07c490'
      }
    });
 
    setChannelData(response.data.data);
  
  } catch (error) {
    console.error('Error fetching data:', error);
  } 
}
useEffect(()=>{

  getSpaces()
},[])

const handleModel=()=>{
  setOpenModal(!openModal);
}
  return (
    <div className="sidebar lg:block hidden sticky  w-36 pb-4 pr-2 top-12 max-h-screen overflow-y-auto dark:text-neutral-400 text-zinc-600">
      <div className="flex flex-col" onClick={handleModel}>
      <div className="flex gap-1 justify-start mb-1 cursor-pointer p-2 rounded border border-solid  dark:bg-neutral-800 dark:border-neutral-700 bg-gray-200">
          <VscDiffAdded />
          <p className="text-sm m-0 pl-1 ">Create Space</p>
      </div>
      </div>
      <CreateSpaceModel onModelClick={handleModel} value={openModal}/>
      <div>
        {channelData&&channelData.map((item,index)=>(
          <Link to="/topic" state={`${item._id}`} key={item._id}><div className="flex gap-1 justify-start mb-1 cursor-pointer p-2 box-border hover:bg-gray-300 rounded"
           key={item._id} 
           onClick={()=>setSelectedSpace({
            ...selectedSpace,
            spaceName:`${item.name}`,
            id:`${item._id}`,
            image:`${item.image} `
           })}>
            <div className="box-border w-7">
              <img src={item.image?"item.image":dpArray[index%dpArray.length]}  className="rounded" alt='group-logo'/>
            </div>
            <div className=" text-xs box-border text-ellipsis">
              {item.name}
            </div>
          </div></Link>
        ))}
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};
  
  export default Sidebar;

