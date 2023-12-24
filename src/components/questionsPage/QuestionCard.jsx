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
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function QuestionCard({postData}){
    const{profile,selectedQuestion,setSelectedQuestion}=useCurrentContext();
    const[openModal,setOpenModal]=useState(false);
    const[question,setQuestion]=useState('');   
    const[postId,setPostId]=useState('');
    const[followState,setFollowState]=useState([]);
    const[downVoteArray,setDownVoteArray]=useState([]);
    const navigate=useNavigate();
    const{darkMode}=useSelector((state)=>state.mode)
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
    return(
        <>
        <div className={`px-4 pt-4 pb-0 border-b border-solid transition-all duration-500 ease-in-out  ${darkMode?"border-gray-700":"border-gray-100"}`} key={postData._id}>
            <Link to='/question-detailpage' state={`${postData._id}`}>
            <h4 className={`m-0 font-bold cursor-pointer hover:underline ${darkMode?"text-zinc-300":"text-zinc-900"}`} 
            onClick={()=>handleQuestion(postData)}>{postData.title}
            </h4>
            </Link>
            <div className="flex justify-between pt-1 pb-1 ">
                <div className="flex gap-2">
                    <div className={`flex py-0 pl-2.5 pr-5 rounded-full h-9 cursor-pointer justify-center items-center mb-1.5  border border-solid  ${darkMode?"border-gray-700 bg-neutral-800 hover:bg-zinc-700":"border-gray-200 hover:bg-slate-100"}`}
                     onClick={()=>handleClickAnswer(postData.title,postData._id)} ><SlNote className={`text-lg font-bold ${darkMode?"text-gray-300":"text-gray-700"}`}/>
                      <h4 className={`m-0 pl-1.5 text-sm font-semibold ${darkMode?"text-gray-400":"text-gray-700"}`}>Answer</h4>
                    </div>
                    <div className={`flex py-0 pl-2.5 pr-5 rounded-full h-9 cursor-pointer justify-center items-center mb-1.5 ${darkMode?`${followState.includes(postData.author._id)?"text-blue-600":"text-gray-400 hover:bg-zinc-700"}`:`${followState.includes(postData.author._id)?"text-blue-600":"hover:bg-slate-50"}`}`}
                     onClick={()=>getFollowUser(postData.author._id)}>
                      <TfiRssAlt className="text-lg font-bold"/><h4 className="m-0 pl-1.5 text-sm font-semibold">Follow</h4></div>
                    
                </div>
                <div className="w-full items-end" >
                    <div className="flex items-center justify-end h-full" 
                    onClick={()=>handleDownVoteClick(postData._id,profile.token)}>{downVoteArray.includes(postData._id)?(<BiSolidDownvote className=" text-lg text-blue-600 " />):(<RxThickArrowDown className={`text-xl cursor-pointer ${darkMode?"text-gray-400":"text-gray-700"}`}/>)}</div>
                    {/* <div className="q-for-u-card-btns-left"><BsThreeDots/></div> */}
                </div>

            </div>
        </div>
         <div>
         <AddAnswer onClickModel={handleCloseModel} value={openModal} content={question} id={postId}/>
       </div>
       </>
    )
}
export default QuestionCard;