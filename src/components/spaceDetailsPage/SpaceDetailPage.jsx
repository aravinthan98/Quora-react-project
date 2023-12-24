import { LiaAddressCardSolid } from "react-icons/lia";
import { useCurrentContext } from "../../context/currentContext";
import RelatedTopics from "../relatedTopic/RelatedTopics";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import SpacePost from "./SpacePost";
import Post from "../posts/posts";
import { FollowUser } from "../../utilities/FollowUser";
import { UnFollowUser } from "../../utilities/UnfollowUser";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function SpaceDetailPage(){
    const{darkMode}=useSelector((state)=>state.mode)
    const{selectedSpace,setSelectedSpace,profile}=useCurrentContext();
    const[clickedTab,setClickedTab]=useState('Read');
    const[posts,setPosts]=useState([]);
    const [followState,setFollowState]=useState('Follow');
    const[channel,setChannel]=useState([])
    const{state}=useLocation();

    const handleFollow=()=>{
        if(followState==='Follow'){
             setFollowState('Following');
             FollowUser(state,profile.token);
        }
        else{
             
             setFollowState('Follow')          
             UnFollowUser(state,profile.token);
        }
        
     }
     function getUserDetails(id){
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

            setChannel(result.data);
            console.log("result",result);
           
        } )
        .catch(error => console.log('error', error));
    }
    const getposts=(id)=>{
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
                author_name:selectedSpace.spaceName,
                author_image:selectedSpace.image,
                title:item.title,
                content:item.content,
                post_image:`${item.images?item.images[0]:""}`,
                likeCount:'',
                commentCount:'',
                id:item._id
              }))
            setPosts(newObjArr);
            console.log(result)})
        .catch(error => console.log('error', error));
    }
    useEffect(()=>{   
        getUserDetails(state);
        console.log("state",state) 
        setTimeout(()=>{
            getposts(state)
        })     
       
        
    },[selectedSpace])
    return(
        <div className={`lg:mt-12 mt-24 ${darkMode?"bg-neutral-900":"bg-gray-100"}`}>
            <div className="lg:w-10/12 pt-4 lg:px-6 lg:mx-auto mx-0 w-full">
                <div className="flex">
                    <div className="lg:w-32 lg:block hidden">
                        <Sidebar />
                    </div>              
                    <div className="lg:w-[53%] lg:ml-8 w-full px-1">
                        <div className={`flex p-4 mb-2 box-border rounded border border-solid ${darkMode?"bg-neutral-800 border-zinc-700":"bg-white border-zinc-300"}`}>
                            <div>
                                <img src={channel.image?channel.image:"https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_yellow.png-26-fe83a11d61dd4889.png"} className="w-20 h-20 rounded"/>
                            </div>
                            <div className="flex flex-col justify-around ml-4">
                                <div className={`leading-normal font-bold text-xl ${darkMode?"text-zinc-300":"text-zinc-800"}`}>{channel.name}</div>
                                <div className="flex py-px box-border h-8 justify-start ">               
                                    <button className={followState==='Following'?"text-xs font-bold flex box-border px-3 rounded-full border border-solid border-slate-600 text-slate-400 gap-1 justify-center items-center hover:bg-gray-50 bg-slate-300":"text-xs font-bold flex box-border px-3 rounded-full border border-solid border-blue-500 text-sky-500 gap-1 justify-center items-center hover:bg-blue-50"} onClick={handleFollow}>
                                        <LiaAddressCardSolid className="flex justify-center items-center text-xl" />{followState}</button>
                                </div>
                            </div>
                        </div>
                        <div className={`flex text-slate-400 border-b border-solid  text-[13px] font-medium cursor-pointer ${darkMode?"border-neutral-600":"border-neutral-300"}`}>
                            <div className={clickedTab==='Read'?"py-4 px-2 border-b-4 border-solid border-red-700 text-red-700":"py-4 px-2"} onClick={()=>setClickedTab('Read')}>Read</div>
                            {/* <div className={clickedTab==='Answer'?"py-4 px-2 border-b-2 border-solid border-red-700 text-red-700":"py-4 px-2"} onClick={()=>setClickedTab('Answer')}>Answer</div> */}
                            
                        </div>
                        <div className={`box-border  rounded mt-2 ${darkMode?" bg-neutral-900":" bg-white"}`}>
                            {clickedTab==='Read'&&
                               posts.map((item)=>(
                                <Post postData={item} key={item.id}/>
                               ))
                               
                            }
                            
                        </div>
                    </div>
                    <div>
                        <RelatedTopics/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpaceDetailPage;