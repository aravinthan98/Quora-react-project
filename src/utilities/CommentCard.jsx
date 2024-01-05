import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useCurrentContext } from "../context/currentContext";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import DeleteCommentModel from "../components/modelsSection/DeleteCommentModel";

function CommentCard({comment,onClickrender}){
    const navigate=useNavigate();
    const{profile,selectedProfile,setSelectedProfile,voteArray,setVoteArray}=useCurrentContext();
    const[author,setAuthor]=useState([]);
    const[editClicked,setEditClicked]=useState(false);
    const[updateComment,setUpdateComment]=useState(comment.content);
    const {darkMode}=useSelector((state)=>state.mode);
    const[dotClick,setDotClick]=useState(false);
    const[openDeleteModel,setOpenDeleteModel]=useState(false)
    const handleProfile=(item)=>{
        setSelectedProfile({
            ...selectedProfile,
            profileName:`${item.name}`,
            id:`${item._id}`,
            image:''
        })
        return navigate('/profile');
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
            
            setAuthor(result.data);
           
        } )
        .catch(error => console.log('error', error));
    }

    const updatingComment=(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);

        var raw = JSON.stringify({
        "content": `${updateComment}`
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`https://academics.newtonschool.co/api/v1/quora/comment/${id}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            setEditClicked(false);
           })
        .catch(error => console.log('error', error));
    }
    const handleDeleteModel=()=>{
        setOpenDeleteModel(true)
    }
    const handleComment=()=>{
        setOpenDeleteModel(false)
        setTimeout(()=>{
            onClickrender()
        },500)
    }
    const handleEditComment=(id)=>{        
        updatingComment(id)
        setTimeout(()=>{
            onClickrender()
        },500)
    }
    const handleMore=()=>{
        setDotClick(!dotClick)
    }
    useEffect(()=>{
        getUserDetails(comment.author)
    },[])
    return(
        <div className={`border-b border-solid   px-3 pt-2 ${darkMode?"border-zinc-600":"border-gray-200"}`} key={comment._id} >
            {!editClicked&&
            <div>
            <div className="box-border flex">
                <div className="box-border flex ">
                    <img src="https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png" className="box-border w-9 h-9 rounded-full mr-2 cursor-pointer" onClick={()=>handleProfile(author)}/>
                    
                </div>
                <div className="flex justify-center items-center">
                <h4 className={`font-bold text-[13px] cursor-pointer mb-2 ${darkMode?" text-neutral-300":"text-gray-950"}`} onClick={()=>handleProfile(author)}>{author.name}</h4>
                </div>
            </div>
            <div className="pb-3 pl-12 flex justify-between">
                
                <div className={darkMode?" text-neutral-300":"text-gray-950"}>
                    <div className="box-border">{comment.content}</div> 
                </div> 
                {author._id===profile.id&&
                <div className="box-border flex items-center h-8 min-w-8 px-1e cursor-pointer relative" onClick={handleMore}>
                    <BsThreeDots className="text-xl "/>
                    <div className={dotClick?`block absolute top-auto bottom-1 right-8 translate-x-20 -translate-y-11 rounded border border-solid shadow 
                    ${darkMode?"bg-neutral-800 text-gray-300  border-gray-600":"bg-white  border-gray-300"}`:"hidden"}>
                        <div 
                        onClick={handleDeleteModel}
                        className={`p-2.5 ${darkMode?"hover:bg-neutral-400":"hover:bg-neutral-200"}`}
                        >              
                            <div className=" whitespace-nowrap text-sm ">Delete</div>                                                   
                        </div>
                        <div 
                        className={`p-2.5 ${darkMode?"hover:bg-neutral-400":"hover:bg-neutral-200"}`}
                        onClick={()=>setEditClicked(true)}>                       
                            <div className=" whitespace-nowrap text-sm ">Edit Comment</div>
                            
                        </div>
                        
                    </div>
            </div>
                    
                       
                 
                }
            </div>
            </div>
            }
            {editClicked&&
                <div>
                    <div className="flex py-2 items-center">
                        <div className="px-2 py-1 w-full">
                            <input type="text" name="comment" value={updateComment} onChange={(e)=>setUpdateComment(e.target.value)} className={`w-full h-11 px-3 text-lg outline-none rounded-full border border-solid border-slate-500 ${darkMode?" bg-neutral-800 text-neutral-300": "bg-white text-neutral-900"}`}/>
                        </div>
                        <div className="px-3 py-1 h-8 flex items-center rounded-3xl bg-blue-600 text-white border border-solid border-zinc-200 cursor-pointer hover:bg-blue-400" onClick={()=>handleEditComment(comment._id)}><div>Update</div></div>
                    </div>
                </div>
            }
            <DeleteCommentModel commentId={comment._id} onClickModel={handleComment} value={openDeleteModel}/>
        </div>
    )
}
export default CommentCard;