
import {VscDiffAdded} from 'react-icons/vsc'
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import {RxCross2} from 'react-icons/rx';
import { useCurrentContext } from "../../context/currentContext";
import "./Sidebar.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const[openModal,setOpenModal]=useState(false);
  const{profile}=useCurrentContext();
  const[spaceName,setSpaceName]=useState('');
  const[spaceDescription,setSpaceDescription]=useState('');
  const[channelData,setChannelData]=useState([]);

const handleCreateSpace=()=>{
  var myHeaders = new Headers();
  myHeaders.append("projectID", "f104bi07c490");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${profile.token}`);

var raw = JSON.stringify({
  "name": `${spaceName}`,
  "description": `${spaceDescription}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://academics.newtonschool.co/api/v1/quora/channel/", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
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
  return (
    <div className="sidebar w-36 pb-4 pr-2">
      <div className="sibebarMenu" onClick={()=>setOpenModal(true)}>
      <div className="flex gap-1 justify-start mb-1 cursor-pointer p-2 rounded border border-solid bg-gray-200">
          <VscDiffAdded />
          <p>Create Space</p>
      </div>
      </div>
      <Modal
          open={openModal}
          // onClose={() => setOpenModal(false)}  
      >
        <div className="create_space_section">  
          <div className="create_space_section-main"> 
            <div className="mode-close-icone">
              <RxCross2 onClick={()=>setOpenModal(false)}/>
            </div> 
            <div className="create_space-container">
              <div className="create_space-head">
                <h3>Create a Space</h3>
                <p>Share your interests, curate content, host discussions, and more.</p>
              </div>
             
              <div className="create_space-content">
                <label htmlFor="">Name</label>
                <br/>
                <small>This can be changed in Space settings.</small>
                <input type="text" id="username"
                value={spaceName}
                 onChange={(e)=>setSpaceName(e.target.value)}
                />
                <br/>
                <small></small>
              </div>
              <div className="create_space-content">
                <label htmlFor="email">Brief description</label>
                <br/>
                <small>Include a few keywords to show people what to expect if they join.</small>
                <input type="text" id="email"
                  value={spaceDescription}
                  onChange={(e)=>setSpaceDescription(e.target.value)}
                />
              </div>             
              <div className="create_space-btn-sec">
                <button className="create_space-btn" 
                   onClick={handleCreateSpace}
                >Create</button>
              </div>
            </div>
          </div>   
        </div>
      </Modal>
      <div>
        {channelData&&channelData.map((item)=>(
          <Link to="/topic"><div className="flex gap-1 justify-start mb-1 cursor-pointer p-2 box-border hover:bg-gray-300 rounded" key={item._id}>
            <div className="box-border w-7">
              <img src={item.image}  className="rounded"/>
            </div>
            <div className="text-xs box-border text-ellipsis">
              {item.name}
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};
  
  export default Sidebar;

