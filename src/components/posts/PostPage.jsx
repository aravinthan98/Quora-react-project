
import React, { useEffect, useState, useRef } from "react";
import {RxThickArrowUp} from 'react-icons/rx';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsChat} from 'react-icons/bs';
import {BsThreeDots} from 'react-icons/bs';
import { useCurrentContext } from "../../context/currentContext";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FollowUser } from "../../utilities/FollowUser";
import { UnFollowUser } from "../../utilities/UnfollowUser";
import { FetchVote } from "../../utilities/VoteAContent";
import CommentsModel from "../../utilities/CommentsModel";
import { useSelector } from "react-redux";

function PostPage({postData}){
    const navigate=useNavigate();
    const{profile,selectedProfile,setSelectedProfile,voteArray,setVoteArray,selectedQuestion,setSelectedQuestion}=useCurrentContext();
    const[commentCount,setCommentCount]=useState(postData.commentCount);
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);
    const[clickedBtn,setClickedBtn]=useState('');
    const[likeCount,setLikeCount]=useState(postData.likeCount);  
    const [followState,setFollowState]=useState('Follow');
    const[dotClick,setDotClick]=useState(false);
    const[author,setAuthor]=useState([])

    const{darkMode}=useSelector((state)=>state.mode)

    const handleChats=()=>{       
            setCommentBoxClicked(!commentBoxClicked);
         
    }

    const handleFollow=(id)=>{
       if(followState==='Follow'){
            setFollowState('Following');
            FollowUser(id,profile.token);
       }
       else{
            
            setFollowState('Follow')          
            UnFollowUser(id,profile.token);
       }
       
    }
    const handleVoteClick=(id,token)=>{
        const idCheck = voteArray.includes(id);

        if (!idCheck) {  

            const newIdArray=[...voteArray,id]           
            FetchVote(id,token,"POST");       
            localStorage.setItem('likesIds', JSON.stringify(newIdArray));
            setVoteArray(newIdArray);
            setClickedBtn('upvote') ;
            setLikeCount(prev=>prev+1);
        }
        else{
            const newIdArray=voteArray.filter((item)=>item!==id) 
            localStorage.setItem('likesIds', JSON.stringify(newIdArray));  
            setVoteArray(newIdArray);
            setClickedBtn('');        
            FetchVote(id,token,"DELETE");
            setLikeCount(prev=>prev-1);           
        }    
    }
    const handleDownVoteClick=(id,token)=>{
        const idCheck = voteArray.includes(id);
    
        if (idCheck) {
            const newIdArray=voteArray.filter((item)=>item!==id) 
            localStorage.setItem('likesIds', JSON.stringify(newIdArray));
            setVoteArray(newIdArray);
            setClickedBtn('downvote')
            FetchVote(id,token,"DELETE");
            setLikeCount(prev=>prev-1);
        }
        else{
            if(clickedBtn==="downvote"){
                setClickedBtn('');
            }
            else{        
                setClickedBtn('downvote')          
            }
        }   
    }

    const handleMore=()=>{  
        setDotClick(!dotClick);     
    }
    const handleCloseMore=(id)=>{
        handleDownVoteClick(id,profile.token);
        setDotClick(!dotClick);
    }
    const handleQuestion=(item)=>{
      
        setSelectedQuestion({
      
          ...selectedQuestion,
          title:item.title,
          id:item.id,
          commentCount:item.commentCount
        })
        
      }
      const handleProfile=(item)=>{
        setSelectedProfile({
            ...selectedProfile,
            profileName:`${item.author_name}`,
            id:`${item.author_id}`,
            image:`${item.author_image}`
        })       
    }
     
    return(
        <div  key={postData.id} className={`rounded border mb-3 border-solid transition-all duration-500 ease-in-out ${darkMode ? "border-neutral-800" :  " border-gray-300"}`} >
            <div className={`flex flex-col px-3 pt-3  relative ${darkMode ? " bg-neutral-800 border-neutral-800 text-neutral-300" :  "bg-white border-gray-300 text-gray-950"}`}>
            <div className="box-border flex">
                <div className="box-border flex mb-2">
                <Link to='/profile' state={`${postData.author_id}`}>
                    <img src={postData.author_image?postData.author_image:""} className="w-9 h-9 rounded-full mr-2 cursor-pointer" onClick={()=>handleProfile(postData)}/>
                   </Link>
                   <Link to='/profile' state={`${postData.author_id}`} className="flex">
                    <h4 className="font-bold text-[13px] cursor-pointer" onClick={()=>handleProfile(postData)}>{postData.author_name?postData.author_name:""}</h4>
                    </Link>
                    <span className=" text-sm px-2 font-medium cursor-pointer text-blue-600" onClick={()=>handleFollow(postData.author_id)}>{followState}</span>
                    
                </div>
            </div>
            <div>
                <div>
                    <Link to='/question-detailpage' state={postData}>
                    <div className="box-border mb-1 font-bold text-base cursor-pointer hover:underline" onClick={()=>handleQuestion(postData)}>{postData.title}</div>
                    </Link>
                    <div>{postData.content}</div>               
                </div>
                <div>
                    {postData.image&&
                    <img src={postData.image} alt="post_image"/>
                    }
                </div>
                <div>
                    <div className="box-border flex px-3 flex-nowrap justify-between py-1">
                        <div className="flex items-center cursor-pointer">
                        {postData.author_id===profile.id?(
                            <div className={`box-border flex mr-2 h-8 rounded-full border-r opacity-40 border-solid  ${darkMode?"bg-neutral-700 border-neutral-600":"bg-zinc-100 border-gray-200"}`}>
                                <div className="box-border flex items-center px-2 h-8 " >
                                    <RxThickArrowUp className="text-2xl text-blue-700" />
                                    <span className="text-[13px] font-medium ml-1">Upvote. {likeCount}</span>
                                </div>
                                <div className={`h-8 border-r border-solid ${darkMode?"border-neutral-600":"border-zinc-200"}`}></div>
                                <div className="box-border flex items-center justify-center px-2 pb-1 h-8" >
                                <RxThickArrowDown  className="text-2xl"/>
                                </div>
                            </div>
                        ):(
                            <div className={`box-border flex mr-2 h-8 rounded-full border-r border-solid  ${darkMode?"bg-neutral-700 border-neutral-600":"bg-zinc-100 border-gray-200"}`}>
                                <div className="box-border flex items-center px-2 h-8 " id={clickedBtn==="upvote"?"upvoted":"noupvote"}onClick={()=>handleVoteClick(postData.id,profile.token)}>
                                {voteArray.includes(postData.id)?(<BiSolidUpvote className="text-2xl text-blue-700" />):(<RxThickArrowUp className="text-2xl text-blue-700" />)} 
                                    <span className="text-[13px] font-medium ml-1">Upvote. {likeCount}</span>
                                </div>
                                <div className={`h-8 border-r border-solid ${darkMode?"border-neutral-600":"border-zinc-200"}`}></div>
                                <div className="box-border flex items-center justify-center px-2 pb-1 h-8" onClick={()=>handleDownVoteClick(postData.id,profile.token)}>
                                {clickedBtn==="downvote"?(<BiSolidDownvote className="text-2xl text-orange-700"/>):(<RxThickArrowDown  className="text-2xl"/>)}
                                </div>
                            </div>)}
                            <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2 " id="chat" onClick={handleChats}>
                                <BsChat className="text-lg mr-1" id="chat" />
                                <small id="chat">{commentCount}</small>
                            </div>
                            {/* <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2">
                                <RiLoopLeftLine className="text-xl" />                                                         
                            </div> */}
                        </div>
                        {postData.author_id===profile.id?(
                             <div className="box-border flex items-center h-8 min-w-8 opacity-40 px-1e cursor-pointer" onClick={handleMore}>
                             <BsThreeDots className="text-xl "/>
                             </div>
                        ):(
                        <div className="box-border flex items-center h-8 min-w-8 px-1e cursor-pointer" onClick={handleMore}>
                            <BsThreeDots className="text-xl "/>
                            <div className={dotClick?"block absolute left-auti top-auto bottom-0 right-0 translate-x-20 -translate-y-11 ":"hidden"}>
                            <div className={`p-2.5 rounded border border-solid shadow ${darkMode?"bg-neutral-800 text-gray-300  border-gray-600":"bg-white  border-gray-300"}`}>
                                    <div className="flex gap-1" onClick={()=>handleCloseMore(postData.id)}>
                                    <RxThickArrowDown  className=" text-base"/>
                                    <div className=" whitespace-nowrap text-sm ">Downvote question</div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        )}
                    </div>
                </div>          
            </div>
            </div>
            {commentBoxClicked&&
                <CommentsModel id={postData.id} countComment={setCommentCount}/>
            }
        </div>
    )
}

export default PostPage;

