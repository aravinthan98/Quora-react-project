import { Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import {RxThickArrowUp} from 'react-icons/rx';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsChat} from 'react-icons/bs';
import {BsThreeDots} from 'react-icons/bs';
import { useCurrentContext } from "../../context/currentContext";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import CommentsModel from "../../utilities/CommentsModel";
import { RiBookmarkLine, RiDeleteBinLine } from "react-icons/ri";
import { LuPen } from "react-icons/lu";
import { DeletePost } from "../../utilities/DeletePost";
import UpdatePostModel from "../modelsSection/UpdatePostModel";
import { useSelector } from "react-redux";
import DeletePostModel from "../modelsSection/DeletePostModel";
// import { DeletePost } from "../../utilities/DeletePost";



function ProfilePostModel({postData,postfetch}){
    
    const{darkMode}=useSelector((state)=>state.mode)
    const navigate=useNavigate();
    const[commentCount,setCommentCount]=useState(postData.commentCount);
    const{profile,voteArray,selectedQuestion,setSelectedQuestion}=useCurrentContext();    
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);
    const[dotClick,setDotClick]=useState(false);
    const[openModel,setOpenModel]=useState(false);
    const[openDeleteModel,setOpenDeleteModel]=useState(false)
    
    const handleUpdatePost=()=>{
             
        setOpenModel(false);
        setTimeout(()=>{
            postfetch();
        },1000)
    }
    const handleOpenModel=()=>{
        setOpenModel(true);
    }
    const handleDeleteModel=()=>{
        setOpenDeleteModel(true)
    }
    
    const handleDeletePost=()=>{
        setOpenDeleteModel(false)    
        setTimeout(()=>{
            postfetch();
        },1000)
    }
    const handleChats=()=>{       
            setCommentBoxClicked(!commentBoxClicked);        
    }
    const handleMore=()=>{  
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

    return(
        <>
        <div  key={postData.id}>
            <div className={`flex flex-col px-3 pt-3 mt-3 rounded border border-solid  relative transition-all duration-500 ease-in-out ${darkMode?"bg-neutral-800 border-neutral-700":"bg-white border-gray-300"}`}>
            <div>
                <div>
                    <Link to='/question-detailpage' state={postData}>
                    <div className={`box-border mb-1 font-bold text-base cursor-pointer hover:underline transition-all duration-500 ease-in-out ${darkMode?"text-neutral-200":"text-neutral-900"}`} 
                    onClick={()=>handleQuestion(postData)}>{postData.title}</div>
                    </Link>
                    <div className={darkMode?"text-neutral-300":"text-neutral-800"}>{postData.content}</div>               
                </div>
                <div>
                    {postData.post_image&&
                    <img src={postData.post_image} alt="post_image"/>
                    }
                </div>
                <div>
                    <div className="box-border flex px-3 flex-nowrap justify-between py-1 ">
                        <div className="flex items-center cursor-pointer">
                            <div className={`box-border flex mr-2 h-8 rounded-full opacity-50 border-r border-solid ${darkMode?"bg-neutral-700 border-neutral-600":"bg-zinc-100 border-gray-200"}`}>
                                <div className="box-border flex items-center px-2 h-8 ">
                                    <RxThickArrowUp className="text-2xl text-blue-700" />
                                    <span className="text-[13px] font-medium ml-1">Upvote. {postData.likeCount}</span>
                                </div>
                                <div className={`h-8 border border-solid ${darkMode?"border-neutral-600":"border-zinc-200"}`}></div>
                                <div className="box-border flex items-center justify-center px-2 pb-1 h-8" >
                                    <RxThickArrowDown  className="text-2xl"/>
                                </div>
                            </div>
                            <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2 " id="chat" onClick={handleChats}>
                                <BsChat className="text-lg mr-1" id="chat" />
                                <small id="chat">{commentCount}</small>
                            </div>
                            {/* <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2">
                                <RiLoopLeftLine className="text-xl" />                                                         
                            </div> */}
                        </div>
                        <div className="box-border flex items-center h-8 min-w-8 px-1 cursor-pointer" onClick={handleMore}>
                            <BsThreeDots className="text-xl"/>
                            <div className={dotClick?"block absolute lg:left-auto lg:top-auto bottom-0 right-0 left-1/4 w-1/2 translate-x-20 -translate-y-11 ":"hidden"}>
                                <div className={`py-2.5 rounded border border-solid shadow ${darkMode?"bg-neutral-800 text-gray-300  border-gray-600":"bg-white  border-gray-300"}`}>                               
                                    <div className={`flex gap-1 py-2 px-4 ${darkMode?"hover:bg-zinc-700":"hover:bg-zinc-100"}`} onClick={handleOpenModel}>
                                        <LuPen  className=" text-base"/>
                                        <div className=" whitespace-nowrap text-sm " >Edit post</div>
                                    </div>
                                    <div className={`flex gap-1 py-2 px-4 text-red-700 ${darkMode?"hover:bg-zinc-700":"hover:bg-zinc-100"}`} onClick={handleDeleteModel}>
                                    <RiDeleteBinLine  className=" text-base"/>
                                    <div className=" whitespace-nowrap text-sm ">Delete post</div>
                                    </div>
                                 
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
            </div>
            {commentBoxClicked&&
                <CommentsModel id={postData.id} countComment={setCommentCount}/>
            }
            
        </div>
        <UpdatePostModel object={postData} onClickModel={handleUpdatePost} value={openModel} />
        <DeletePostModel postId={postData.id} onClickModel={handleDeletePost} value={openDeleteModel}/>
        </>
    )
}

export default ProfilePostModel;

