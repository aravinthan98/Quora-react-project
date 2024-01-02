import React, { useEffect } from "react";
import { MdBusinessCenter } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import ProfilePost from "./ProfilePosts";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";
function MyProfile(){
    const{profile,selectedProfile}=useCurrentContext();
    const[details,setDetails]=useState({});
    const[clickedTab,setClickedTab]=useState('Profile');
    const [followState,setFollowState]=useState('Follow');
    const{darkMode}=useSelector((state)=>state.mode)
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
            console.log(result);
            const newResult={
                name:`${result.data.name?result.data.name:""}`,
                image:result.data.profileImage,
                designation:`${result.data.workExperience?result.data.workExperience[0].designation:""}`,
                degree:`${result.data.education.length!==0?result.data.education[0].degree:""}`,
                companyName:`${result.data.workExperience?result.data.workExperience[0].companyName:""}`,
                city:`${result.data.address.length!==0?result.data.address[0].city:""}`,
                state:`${result.data.address.length!==0?result.data.address[0].state:""}`,
                country:`${result.data.address.length!==0?result.data.address[0].country:""}`

            }
            console.log(newResult)
            setDetails(newResult);
           
        } )
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{ 
        getUserDetails(profile.id);         
      
    },[])
   
    return(
        <div className={`lg:mt-12 mt-24 w-full h-full transition-all duration-300 ease-out ${darkMode?"bg-neutral-900 text-zinc-400":"bg-[#fff]"}`}>
            <div className="box-border lg:w-98 h-screen lg:mx-auto mx-0 pt-8 px-6 pb-6 items-stretch font-sans leading-6">
                <div className="flex lg:flex-row flex-col justify-between w-full">
                    <div className="lg:w-auto w-full mb-4" >
                        <div className="flex box-border">
                            <div className="h-32 w-32 text-white bg-green-500 rounded-full grid place-items-center mr-6">                                  
                                <div className="pb-2 text-7xl">{profile.userName[0].toUpperCase()}</div>                              
                            </div>
                            <div className="flex justify-center items-center mb-4">
                                <h2 className={`m-0 text-4xl font-bold ${darkMode?"text-zinc-300":"text-zinc-800"}`}>{profile.userName}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="box-border w-80">
                        <div className=" box-border mb-4">
                            <div className={`px-0 py-2 box-border font-medium  border-b border-solid border-zinc-300 ${darkMode?"text-zinc-300":"text-zinc-800"}`}>Credentials & Highlights</div>
                            <div className={`${darkMode?"text-neutral-300":"text-zinc-800"}`}>
                                <div className="flex  box-border py-1 px-0 items-start">
                                    <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200 "}`} ><MdBusinessCenter className={darkMode?"text-zinc-300":"text-zinc-800"} />
                                    </div>
                                    <div > {details.designation?details.designation:""} at {details.companyName?details.companyName:""}
                                    </div>
                                </div>
                                <div className="flex  box-border py-1 px-0 items-start">
                                    <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200 "}`}><LuGraduationCap className={darkMode?"text-zinc-300":"text-zinc-800"} />
                                    </div>
                                    <div > Studied {details.degree?details.degree:"not found"}
                                    </div>
                                </div>
                                <div className="flex  box-border py-1 px-0 items-start">
                                    <div className={`mr-1 box-border flex justify-center items-center h-6 w-6 rounded-full text-sm ${darkMode?"bg-zinc-800":"bg-zinc-200 "}`}><SlLocationPin className={darkMode?"text-zinc-300":"text-zinc-800"} />
                                </div>

                                <div >
                                {
                                    details&&
                                    <div>
                                    Lives in {details.city?details.city:"not found"},
                                    {details.state? details.state:""}, {details.country? details.country:""}
                                    </div>
                                }
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile_Details-spaces"></div>
                    </div>
                </div>
                <div className={`box-border lg:w-51 w-full ${darkMode?"bg-neutral-900":"bg-neutral-300"}`}>
                    <div className="box-border mt-2">
                        <div className={`flex justify-between border-b border-solid border-gray-300 text-[13px] font-medium ${darkMode?"border-gray-500":"border-gray-300"}`}>
                            <div className={`py-4 px-2 ${clickedTab==='Profile'?"border-b-4 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Profile')}>Profile</div>
                            <div className={`py-4 px-2 ${clickedTab==='Answer'?"border-b-2 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Answer')}>Answer</div>
                            <div className={`py-4 px-2 ${clickedTab==='Question'?"border-b-2 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Question')}>Question</div>
                            <div className={`py-4 px-2 ${clickedTab==='Posts'?"border-b-2 border-solid border-red-700 text-red-700 cursor-pointer":"border-none text-neutral-400 cursor-pointer"}`} onClick={()=>setClickedTab('Posts')}>Posts</div>
                          
                        </div>
                        <div>
                            <div className="flex py-2 justify-between">
                                <div className={darkMode?"text-zinc-200":"text-zinc-900"}>{clickedTab}</div>
                              
                            </div>
                            {clickedTab==='Profile' &&
                                
                                <ProfilePost/>
                            }
                            {clickedTab==='Answer' && 
                               
                                <ProfilePost/>
                            }
                            {clickedTab==='Posts' &&
                               
                                <ProfilePost/>
                            }
                            
                        </div>
                    </div>  
                </div>
              
            </div>
        </div>
    )
}
export default MyProfile;