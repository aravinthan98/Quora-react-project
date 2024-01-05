import React, { useEffect } from "react";
import { PiUserSquare } from "react-icons/pi";
import { MdBusinessCenter } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { useCurrentContext } from "../../context/currentContext";
import { useState } from "react";
import { FollowUser } from "../../utilities/FollowUser";
import { UnFollowUser } from "../../utilities/UnfollowUser";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserPosts from "./UserPosts";
function ProfileDetailsPage(){
    const{profile}=useCurrentContext();
    const[details,setDetails]=useState({});
    const[clickedTab,setClickedTab]=useState('Profile');
    const [followState,setFollowState]=useState('Follow');
    const {state}=useLocation();
    const{darkMode}=useSelector((state)=>state.mode)
   
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

        fetch(`https://academics.newtonschool.co/api/v1/quora/user/${id}`, requestOptions)
        .then(response => response.json())
        .then((result) =>{
           
            const newResult={
                name:`${result.data.name?result.data.name:""}`,
                image:result.data.profileImage||"https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png",
                designation:`${result.data.workExperience?result.data.workExperience[0].designation:""}`,
                degree:`${result.data.education.length!==0?result.data.education[0].degree:""}`,
                companyName:`${result.data.workExperience?result.data.workExperience[0].companyName:""}`,
                city:`${result.data.address.length!==0?result.data.address[0].city:""}`,
                state:`${result.data.address.length!==0?result.data.address[0].state:""}`,
                country:`${result.data.address.length!==0?result.data.address[0].country:""}`

            }
            setDetails(newResult);
           
        } )
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        if(state){
            getUserDetails(state);         
        }
    },[state])
 
    return(
        <div className={`lg:pt-12 pt-24 w-full h-screen overflow-y-scroll transition-all duration-300 ease-out ${darkMode?"bg-neutral-900 text-zinc-400":"bg-[#fff]"}`}>
            <div className="box-border lg:w-98  lg:mx-auto mx-0 pt-8 px-6 pb-6 items-stretch font-sans leading-6">               
                <div className="flex lg:flex-row flex-col justify-between w-full">
                    <div className="lg:w-auto w-full mb-4">
                        <div className="flex box-border">
                            <div>
                                <img src={details.image?details.image:""} alt="profile-image" className="box-border lg:w-32 lg:h-32 rounded-full mr-6"/>
                            </div>
                            <div>
                                <h2 className={`m-0 text-3xl font-medium ${darkMode?"text-zinc-300":"text-zinc-800"}`}>{details.name}</h2>
                                <p className="mt-1 text-lg">{details.designation?details.designation:""}</p>                               
                                <div className="mt-1 mx-0 mb-0" ></div>
                                <div className="flex box-border mt-3 text-base">
                                    <div className="flex justify-center items-center box-border py-0 pr-4 pl-3 h-8 text-white font-medium text-[13px] cursor-pointer bg-blue-600 rounded-full mr-2 border border-solid border-gray-300 hover:bg-blue-400" onClick={handleFollow}><PiUserSquare className="mr-1.5 text-lg text-white" />{followState}</div>
                            
                                </div>
                            </div>
                        </div>                     
                    </div>
                    <div className=" box-border w-80 ">
                        <div className=" box-border mb-4">
                            <div className={`px-0 py-2 box-border font-medium  border-b border-solid ${darkMode?"text-zinc-300 border-zinc-600":"text-zinc-800 border-zinc-300"}`}>Credentials & Highlights</div>
                            <div className={`${darkMode?"text-neutral-300":"text-zinc-800"}`}>
                                <div className="flex  box-border py-1 px-0 items-start">
                                    <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200 "}`} ><MdBusinessCenter className={darkMode?"text-zinc-300":"text-zinc-800"}/>
                                    </div>
                                    <div > {details.designation?details.designation:""}{details.companyName?`at ${details.companyName}`:"No data found"}
                                    </div>
                                </div>
                                <div className="flex  box-border py-1 px-0 items-start">
                                    <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200 "}`}><LuGraduationCap className={darkMode?"text-zinc-300":"text-zinc-800"} />
                                    </div>
                                    <div>{details.degree?`Studied ${details.degree}`:"No data found"}</div>
                                    </div>
                                    <div className="flex  box-border py-1 px-0 items-start">
                                        <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200"}`}><SlLocationPin className={darkMode?"text-zinc-300":"text-zinc-800 "} />
                                        </div>

                                        <div>
                                        {
                                            details&&
                                            <div>
                                            {details.city?`Lives in ${details.city}`:"No data found"},
                                            {details.state? details.state:""}, {details.country? details.country:""}
                                            </div>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>                    
                    </div>
                </div>
                <div className="box-border lg:w-51 w-full">
                    <div className=" box-border mt-2">
                        <div className={`flex justify-between border-b border-solid border-gray-300 text-[13px] font-medium ${darkMode?"border-gray-500":"border-gray-300"}`}>
                            <div className={`py-4 px-2 ${clickedTab==='Profile'?"border-b-4 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Profile')}>Profile</div>
                            <div className={`py-4 px-2 ${clickedTab==='Answer'?"border-b-4 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Answer')}>Answer</div>
                            <div className={`py-4 px-2 ${clickedTab==='Question'?"border-b-4 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Question')}>Question</div>
                            <div className={`py-4 px-2 ${clickedTab==='Posts'?"border-b-4 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Posts')}>Posts</div>
                           
                        </div>
                        <div>
                            <div className="flex py-2 justify-between">
                                <div className={darkMode?"text-zinc-200":"text-zinc-900"}>{clickedTab}</div>
                                
                            </div>
                            {clickedTab==='Profile' &&
                                
                                <UserPosts id={state}/>
                            }
                            {clickedTab==='Answer' && 
                                <UserPosts id={state} />
                            }
                            {clickedTab==='Question'&&
                                <div className="text-center">No Data found</div>
                            }
                            {clickedTab==='Posts' &&
                                <UserPosts id={state}/>
                            }
                            
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}
export default ProfileDetailsPage;