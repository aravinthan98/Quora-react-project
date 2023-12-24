import { Avatar } from "@mui/material";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";
import { useCurrentContext } from "../context/currentContext";
import { GetComments } from "./GetComments";
import { AddComment } from "./AddComment";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import LoadingSec from "./LoadingSec";
import { useSelector } from "react-redux";

function CommentsModel({id}){
    
    const[replyComment,setReplyComment]=useState('');  
    const{profile}=useCurrentContext()
    const[comments,setComments]=useState([]);
    const[loading,setLoading]=useState(false);
    const{darkMode}=useSelector((state)=>state.mode);

    const fetchComments=(id)=>{
        
        GetComments(id,profile.token)
        .then(result => {  
            console.log(result); 
            const reversedData = result.data.reverse();     
            setComments(reversedData.slice(0,10));
            setLoading(false)
        })
        .catch(error => {         
            console.error('getcomments error:', error);
        });
        
    }
    const handlefetch=()=>{
       
        fetchComments(id);
    }
    const handleComment=()=>{
      
        AddComment(id,replyComment,profile.token); 
        setTimeout(()=>{
            fetchComments(id);
           
        },1000)   
        setReplyComment('')      
    }
    const handleKeyPress=(event)=>{
        if(event.key==='Enter'){
            handleComment()
        }
    }

    useEffect(()=>{
        setLoading(true)
        fetchComments(id);
    },[])
    

    return(
        <div className={`block box-border ${darkMode?" bg-neutral-800":"bg-white"}`}>
        <div className={`flex box-border px-3 py-2 border-x border-solid  shadow  ${darkMode?" bg-zinc-800 border-slate-600":" bg-slate-100 border-slate-200"}`}>
            <div className="mycommentsBox_info">
                <Avatar
                src={profile.image?profile.image:""}/>
        
            </div>
            <div className={`w-3/4 box-border lg:px-4 px-1 py-2 rounded-3xl sm:ml-2  ${darkMode?" bg-neutral-700":"bg-white"}`}>
                <input type="text" className={`w-full outline-none ${darkMode?" bg-neutral-700 text-white":"bg-white text-black"}`}
                 placeholder="Add a comment..." value={replyComment}
                 onKeyDown={handleKeyPress}   
                 onChange={(e)=>setReplyComment(e.target.value)} />
            </div>  
            <div className=" box-border ml-1 flex items-center justify-end max-sm:hidden"> 
                <button className="box-border lg:px-4 h-8 flex lg:text-sm text-xs sm:whitespace-nowrap justify-center items-center rounded-3xl font-medium border border-solid border-gray-300 bg-blue-500  text-white outline-none"onClick={handleComment}>Add comment</button>
            </div>
        </div>
        {loading?
            (<div className="w-full flex justify-center items-center">
            <Loading />          
            </div>):
            (<div>
                {
                    comments.map((item)=>(
                       <CommentCard key={item._id} comment={item} onClickrender={handlefetch} />
                    ))
                }
                </div>)
        }
        
    </div>
    )
}
export default CommentsModel;