import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import DeleteChannelModel from "../modelsSection/DeleteChannelModel";
import { useSelector } from "react-redux";
function ChannelSettingPage(){
    const{profile}=useCurrentContext();
    const{state}=useLocation();
    const[channelDetails,setChannelDetails]=useState([])
    const[channelName,setChannelName]=useState('');
    const[channelDescription,setChannelDescription]=useState('');
    const[spaceDeleteModel,setSpaceDeleteModel]=useState(false);
    const{darkMode}=useSelector((state)=>state.mode);
    const handleDeleteSpace=()=>{
        setSpaceDeleteModel(!spaceDeleteModel)
    }
    const fetchChannelDetail=(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`https://academics.newtonschool.co/api/v1/quora/channel/${id}`, requestOptions)
          .then(response => response.json())
          .then((result) =>{
            console.log(result.data)
            console.log(profile.token);
            setChannelDetails(result.data); 
            setChannelName(result.data.name);
            setChannelDescription(result.data.description);
          } )
          .catch(error => console.log('error', error));      
      }
    
    const updateChannel=()=>{
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);

        var formdata = new FormData();
        formdata.append("name", `${channelName}`);
        formdata.append("description", `${channelDescription}`);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch(`https://academics.newtonschool.co/api/v1/quora/channel/${channelDetails._id}/`, requestOptions)
        .then(response => response.text())
        .then((result) =>{
             console.log(result)
             fetchChannelDetail(channelDetails._id)
            })
        .catch(error => console.log('error', error));
    }
    const handleChannelUpdate=()=>{
        if(channelName&&channelDescription){
            updateChannel()
        }
    }
    useEffect(()=>{
        fetchChannelDetail(state)
    },[state])

    return(
        <div className={`w-full h-screen  ${darkMode?"bg-neutral-900":"bg-gray-100"}`}>
            <div className=" mt-12">
                <div className=" bg-[url('https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png')] w-full h-20 mb-4">
                    <div className=" lg:w-98 lg:px-6  px-2 lg:mx-auto lg:flex h-full">
                        <div className="h-full flex justify-center items-center">
                        <img src="https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_yellow.png-26-fe83a11d61dd4889.png"
                         className="w-14 rounded-2xl"/>
                        </div>
                        <div className="flex justify-center items-center text-white ">
                            <div className="ml-4">
                            <h1 className=" font-bold text-2xl">{channelDetails.name}</h1>
                            <p>{channelDetails.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" lg:w-98 lg:px-6  px-2 lg:mx-auto lg:flex h-full">
                    <div className="w-full flex gap-8">
                        <div className=" w-1/3">
                            <div className={`w-full mb-3  rounded ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white"}`}>
                                <Link to="/channel_detail_page">
                                <div className="flex px-2 pt-2 gap-1 items-center" >
                                    <div><MdOutlineArrowBackIos/></div>
                                    <div className=" text-[13px]">Back to Space page</div>
                                </div>
                                </Link>
                                <div className="px-4 py-2 text-lg">Admin dashboard</div>
                            </div>
                            <div className={`w-full rounded px-4 border-l-4 border-solid border-x-yellow-600 ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white"}`}>
                                <div className="flex py-2 gap-1 items-center">
                                    <div className=" text-xl"><SlSettings/></div>
                                    <div>Settings</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 ">
                            <div className={` mb-4 border border-solid ${darkMode?"bg-neutral-800 border-zinc-800 text-zinc-300":"bg-white border-zinc-300"}`}>
                                <div className={`w-full px-4 py-2 border-b border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>General</div>
                                <div className="p-4">                              
                                    <div className="w-full mb-4">
                                        <div><label htmlFor="name">Name</label></div>
                                        <div className={`p-2 w-full rounded border border-solid  ${darkMode?"bg-neutral-900 border-zinc-600":"bg-white border-gray-300"}`}>
                                            <input type="text" name="name" className={`w-full outline-none ${darkMode?"text-zinc-300 bg-neutral-900":""}`} 
                                            value={channelName}
                                            onChange={(e)=>setChannelName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full mb-4">
                                        <div><label htmlFor="description">Description</label></div>
                                        <div className={`p-2 w-full rounded border border-solid border-gray-300  ${darkMode?"bg-neutral-900 border-zinc-600":"bg-white border-gray-300"}`}>
                                            <input type="text" name="description" className={`w-full outline-none ${darkMode?"text-zinc-300 bg-neutral-900":""}`}
                                            value={channelDescription}
                                            onChange={(e)=>setChannelDescription(e.target.value)}
                                             />
                                        </div>
                                    </div>
                                    <div className="w-full flex">                      
                                        <div className={`py-2 px-4 text-sm font-medium rounded-full  ${darkMode?"bg-blue-600 text-white":"bg-gray-300"}`} onClick={handleChannelUpdate}>
                                            <button>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-full border border-solid  ${darkMode?"bg-neutral-800 border-zinc-800 text-zinc-300":"bg-white border-zinc-300"}`}>
                                <div className={`w-full px-4 py-2 font-semibold border-b border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>Delete Space</div>
                                <div className="p-4">
                                    <div className="w-full">Deleting this Space will remove the Space page and all its content and comments. This cannot be undone.</div>
                                    <div className="pt-4 w-full flex">
                                       
                                        <div className="py-2 px-4 text-sm font-medium rounded-full bg-orange-700 text-white" onClick={handleDeleteSpace}>
                                            <button>Delete Space</button>
                                        </div>
                                      
                                    </div>
                                </div>
                                <DeleteChannelModel spaceObj={channelDetails} onClickModel={handleDeleteSpace} value={spaceDeleteModel}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChannelSettingPage;