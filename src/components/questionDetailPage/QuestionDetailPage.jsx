import AddAnswer from "../modelsSection/AnswerAQuestion";
import { FollowUser } from "../../utilities/FollowUser";
import { UnFollowUser } from "../../utilities/UnfollowUser";
import { FetchVote } from "../../utilities/VoteAContent";
import { BiSolidDownvote } from "react-icons/bi";
import { useCurrentContext } from "../../context/currentContext";
import {SlNote} from 'react-icons/sl';
import {RxThickArrowDown} from 'react-icons/rx';
import {TfiRssAlt} from 'react-icons/tfi';
import {PiPencilSimpleSlashLight} from 'react-icons/pi'
import React,{useEffect, useState} from "react";
import { BsChat } from "react-icons/bs";
import { AddComment } from "../../utilities/AddComment";
import { GetComments } from "../../utilities/GetComments";
import CommentsModel from "../../utilities/CommentsModel";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function QuestionDetailPage(){
    const{profile,selectedQuestion,setSelectedQuestion,relatedQuestion,setRelatedQuestion}=useCurrentContext();
    const[openModal,setOpenModal]=useState(false);
    const[question,setQuestion]=useState('');   
    const[postId,setPostId]=useState('');
    const[followState,setFollowState]=useState([]);
    const[downVoteArray,setDownVoteArray]=useState([])
    const[commentCount,setCommentCount]=useState(selectedQuestion.commentCount);
    const[comments,setComments]=useState([]);
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);   
    const{state}=useLocation();
    const[post,setPost]=useState([]);
    const{darkMode}=useSelector((state)=>state.mode)
    
    const fetchQuestion=(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}`, requestOptions)
        .then(response => response.json())
        .then((result) =>{
            const newObjArr={
                title:result.data.title,
                content:result.data.content,
                likeCount:result.data.likeCount,
                commentCount:result.data.commentCount,
                id:result.data._id
            }
            setPost(newObjArr);
        })
        .catch(error => console.log('error', error));
    }
    const fetchComments=(id)=>{
        GetComments(id,profile.token)
        .then(result => {   
            const reversedData = result.data.reverse();     
            setComments(reversedData);
            setCommentCount(result.data.length);
        })
        .catch(error => {         
            console.error('getcomments error:', error);
        });
        
    }
    const handleChats=(id)=>{   
        if(!commentBoxClicked){
            setCommentBoxClicked(true);
            fetchComments(id);
        }
        else{
            setCommentBoxClicked(false);
        }     
    }
    const handleClickAnswer=(ques,id)=>{
        setOpenModal(true);
        setQuestion(ques);
        setPostId(id);
    }
    const handleCloseModel=()=>{
        setOpenModal(false);
    }
    const handleDownVoteClick=(id,token)=>{
        const idCheck = downVoteArray.includes(id);
        if (!idCheck) {   
          const newIdArray=[...downVoteArray,id]    
          setDownVoteArray(newIdArray);
          FetchVote(id,token,'DELETE');      
        }
        else{
            const newIdArray=downVoteArray.filter((item)=>item!==id)   
            setDownVoteArray(newIdArray);  
        }      
    }
    const getFollowUser=(id)=>{
        if(followState.includes(id)){
          const newIdArray=followState.filter((item)=>item!==id);
          setFollowState(newIdArray);
          UnFollowUser(id,profile.token);
        }
        else{     
          const newIdArray=[...followState,id]
          setFollowState(newIdArray);
          FollowUser(id,profile.token);
          
        }       
      }
      const handleQuestion=(item)=>{    
        setSelectedQuestion({
          ...selectedQuestion,
          title:item.title,
          id:item._id,
          commentCount:item.commentCount
        })
  
      }
    useEffect(()=>{
       
        fetchQuestion(state)
    },[])
    return(
        <div className={`w-full h-screen lg:mt-12 mt-24 ${darkMode?"bg-neutral-900 text-zinc-300":"bg-zinc-100 "}`}>
            <div className="lg:w-98 lg:mx-auto w-full mx-0 pt-4 flex lg:gap-4" >
                <div className="lg:w-3/5 w-full px-2">
                    <div className={`px-3 pt-3 pb-0 border border-solid ${darkMode?"bg-neutral-900 border-zinc-600":"bg-white border-gray-400"}`}>
                        <h4 className="text-xl m-0 font-bold">{post.title}</h4>
                        <div className="flex justify-between pt-1 pb-1 ">
                            <div className="flex">
                                <div className={`flex py-0 pl-2.5 pr-5 rounded-full h-9 cursor-pointer justify-center items-center mb-1.5  ${darkMode?"border-gray-700 bg-neutral-800 hover:bg-zinc-700":"border-gray-200 hover:bg-slate-100"}`}  
                                onClick={()=>handleClickAnswer(post.title,post.id)} ><SlNote className={`text-lg font-bold ${darkMode?"text-gray-300":"text-gray-700"}`}/> <h4 className={`m-0 pl-1.5 text-sm font-semibold ${darkMode?"text-gray-400":"text-gray-700"}`}>Answer</h4></div>
                                <div className={`hidden sm:flex py-0 pl-2.5 pr-5 rounded-full h-9 cursor-pointer justify-center items-center mb-1.5 ${darkMode?`${followState.includes(post.id)?"text-blue-600":"text-gray-400 hover:bg-zinc-700"}`:`${followState.includes(post.id)?"text-blue-600":"hover:bg-slate-50"}`}`} 
                                onClick={()=>getFollowUser(post.id)}><TfiRssAlt className="text-lg font-bold"/><h4 className={`m-0 pl-1.5 text-sm font-semibold ${darkMode?"text-gray-400":"text-gray-700"}`}>Follow</h4></div>
                            </div>
                            <div className="flex w-full justify-end items-end gap-5" >
                                <div className="flex items-center justify-end h-full" id="chat" onClick={()=>handleChats(post.id)}>
                                    <BsChat className={`text-lg mr-1 cursor-pointer ${darkMode?"text-zinc-400":"text-gray-600"}`} id="chat" />
                                    <small id="chat">{commentCount}</small>
                                </div>
                                <div className="flex items-center justify-end h-full" onClick={()=>handleDownVoteClick(post.id,profile.token)}>
                                    {downVoteArray.includes(post.id)?(<BiSolidDownvote className=" text-2xl text-blue-600 " />):(<RxThickArrowDown className={`text-2xl cursor-pointer ${darkMode?"text-zinc-400":"text-gray-600"}`}/>)}
                                </div>                      
                            </div>
                        </div>                                                                                    
                    </div>
                    {commentBoxClicked&&    
                        <CommentsModel id={post.id}/>
                    } 
                </div>
                <div>
                <AddAnswer onClickModel={handleCloseModel} value={openModal} content={question} id={postId}/>
                </div>
                <div className={`lg:w-1/3 lg:block hidden h-96 overflow-hidden ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white"}`}>
                    <div>
                        <div className={`py-2 px-3 border-b border-solid  ${darkMode?"border-zinc-600":"border-slate-300"}`}>Related Questions</div>
                        <div className="px-4">
                            {relatedQuestion&& relatedQuestion.map((item)=>(
                                <div key={item._id} className=" text-blue-700 py-2 cursor-pointer hover:underline" onClick={()=>handleQuestion(item)}>{item.title}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default QuestionDetailPage;
