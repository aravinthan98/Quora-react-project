import React, { useEffect, useState } from "react";
import { useCurrentContext } from "../../context/currentContext";
import './ChannelDetailPage.scss';
import Post from "../posts/posts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
function ChannelDetailPage(){
  const{darkMode}=useSelector((state)=>state.mode)
  const{selectedChannel,renderChannel,profile}=useCurrentContext();
  const[channelDetails,setChannelDetails]=useState([]);
  const[channelPosts,setChannelPost]=useState([]);
  const[channelTab,setChannelTab]=useState('channel-post');
  const{state}=useLocation();
  const navigate=useNavigate()
  const fetchChannelPost=(id)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${profile.token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://academics.newtonschool.co/api/v1/quora/channel/${id}/posts?limit=10`, requestOptions)
      .then(response => response.json())
      .then((result) =>{
        const newObjArr= result.data.slice(0,10).map((item)=>({
          author_id:item.author,
          author_name:selectedChannel.channelName,
          author_image:selectedChannel.image,
          title:item.title,
          content:item.content,
          post_image:`${item.images?item.images[0]:""}`,
          likeCount:'',
          commentCount:'',
          id:item._id
        }))
        setChannelPost(newObjArr);
    
      } )
      .catch(error => console.log('error', error));
      
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
        setChannelDetails(result.data);
        fetchChannelPost(id); 
        
      } )
      .catch(error => console.log('error', error));      
  } 
    useEffect(()=>{
    
      if(state){   
        fetchChannelDetail(state)  
      }                      
    },[state])

    useEffect(()=>{
      if(renderChannel){
      fetchChannelDetail(renderChannel)
      }
    },[renderChannel])
    return(
        <div className={`channel_detail-page h-full lg:mt-2 mt-24 w-full ${darkMode?"bg-neutral-900":"bg-gray-100"}`}>
          <div className="channel-detail-top_section w-full">
            <div className="blur-section">
              {channelDetails.length!==0&&
              <img src={channelDetails.owner.profileImage?channelDetails.owner.profileImage:"https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png"}/>
              }   
              <div className="blur-content"></div>
            </div>
            <div className="channel-logo lg:w-98 w-full">
              {channelDetails.length!==0&&
              <img src={channelDetails.owner.profileImage?channelDetails.owner.profileImage:"https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png"} className="lg:ml-32 ml-0 w-full"/>
              }       
            </div>
            <div className="channel-profile-sec lg:w-98 lg:px-6 lg:left-32 left-0 px-2 ">
                <img src={channelDetails.image?channelDetails.image:"https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_yellow.png-26-fe83a11d61dd4889.png"}/>
                <h1 className=" font-bold">{channelDetails.name}</h1>
                <p>{channelDetails.description}</p>
            </div>
            {channelDetails.length!==0&&channelDetails.owner._id===profile.id&&
              <div className="absolute left-auto right-16 bottom-4">
                  <Link to='/channel_setting_page' state={channelDetails._id}>
                  <div className="p-3 rounded-full bg-slate-400">
                    <div><FiSettings/></div>
                  </div>
                  </Link>
              </div>
            }
          </div>
           
          <div className="channel-detail-bottom-section lg:w-98 lg:mx-auto lg:px-6 mx-0 px-0 w-full">
            <div className={`channel-detail-navbar-section lg:w-3/4 w-full flex ${darkMode?"text-gray-300 border-b border-solid border-neutral-700":"text-gray-800 border-b border-solid border-neutral-300"}`}>          
              <div className={channelTab==="channel-post"?"channel-tab-selected":"channel-detail-tab"} onClick={()=>setChannelTab("channel-post")}>Post</div>
            </div>
            <div className={channelTab==="channel-post"?`lg:w-3/5 w-full mt-5 mx-0 ${darkMode?"bg-neutral-900 text-gray-300":"bg-gray-100"}`:"hidden"}>
              
              {channelPosts&&channelPosts.map((item)=>(
                  <Post key={item.id}  postData={item}  />
              ))}
              {channelPosts.length===0&&
                <div>No Posts Yet</div>
              }
            </div>
            </div>
        </div>
    )
}
export default ChannelDetailPage;



