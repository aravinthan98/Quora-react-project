import React,{useState} from "react";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";
function CreateSpaceModel({onModelClick,value}){
  const{profile}=useCurrentContext();
  const[spaceName,setSpaceName]=useState('');
  const[spaceDescription,setSpaceDescription]=useState('');
  const{darkMode}=useSelector((state)=>state.mode)

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
    .then((result) => {
      onModelClick()
      })
    .catch(error => console.log('error', error));
    }
    return(
        <Modal
          open={value}
          onClose={onModelClick}  
      >
        <div className="w-full h-full flex justify-center items-center">  
          <div className={`rounded-lg w-auto h-auto border border-solid ${darkMode?"bg-neutral-900 text-zinc-300 border-neutral-700":"bg-white border-neutral-200"}`}> 
            <div className="leading-normal py-3 pr-2 pl-4 text-lg cursor-pointer">
              <RxCross2 onClick={onModelClick}/>
            </div> 
            <div className="pl-3">
              <div className="pt-0 px-3 pb-3">
                <h3 className="m-0 p-0 font-bold text-lg">Create a Space</h3>
                <p className="my-2">Share your interests, curate content, host discussions, and more.</p>
              </div>
             
              <div className="p-2">
                <label htmlFor="" className="font-medium text-base">Name</label>
                <br/>
                <small>This can be changed in Space settings.</small>
                <input type="text" id="username"
                value={spaceName}
                 onChange={(e)=>setSpaceName(e.target.value)}
                 className={`px-3 py-2 w-full rounded text-sm outline-none border border-solid  mt-2 hover:border-blue-600 ${darkMode?"bg-neutral-950 border-zinc-600":"bg-white border-gray-300"}`}
                />
                <br/>
                <small></small>
              </div>
              <div className="p-2 my-4">
                <label htmlFor="email" className="font-medium text-base">Brief description</label>
                <br/>
                <small>Include a few keywords to show people what to expect if they join.</small>
                <input type="text" id="email"
                  value={spaceDescription}
                  onChange={(e)=>setSpaceDescription(e.target.value)}
                    className={`px-3 py-2 w-full rounded text-sm outline-none border border-solid mt-2 hover:border-blue-600 ${darkMode?"bg-neutral-950 border-zinc-600":"bg-white border-gray-300"}`} 
                />
              </div>             
              <div className="flex justify-end py-4" onClick={handleCreateSpace}>
                <button className=" h-9 px-5 rounded-3xl border-none outline-none bg-blue-600 text-white font-medium text-sm mr-5 cursor-pointer hover:bg-zinc-700"            
                >Create
                </button>
              </div>
            </div>
          </div>   
        </div>
      </Modal>
    )

}
export default CreateSpaceModel;