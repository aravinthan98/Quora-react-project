import { Avatar } from "@mui/material";
import React, { useState } from "react";
import './posts.scss';
import {RxThickArrowUp} from 'react-icons/rx';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsChat} from 'react-icons/bs';
import {RiLoopLeftLine} from 'react-icons/ri';
import {BsThreeDots} from 'react-icons/bs';
import { useCurrentContext } from "../../context/currentContext";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";


function Post({postData}){
    
    const{profile,setSelectedProfile}=useCurrentContext();
    const[comments,setComments]=useState([]);
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);
    const[replyComment,setReplyComment]=useState('');
    const[voteArray,setVoteArray]=useState([]);
    const[clickedBtn,setClickedBtn]=useState('')

const postReplyComment=(id)=>{
    var myHeaders = new Headers();
myHeaders.append("projectID", "f104bi07c490");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${profile.token}`);

var raw = JSON.stringify({
  "content": `${replyComment}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`https://academics.newtonschool.co/api/v1/quora/comment/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    console.log(result)})
  .catch(error => console.log('error', error));

  setReplyComment('')
}
const handleComments=(id)=>{
    setCommentBoxClicked(!commentBoxClicked);
    var myHeaders = new Headers();
myHeaders.append("projectID", "f104bi07c490");
myHeaders.append("Authorization", `Bearer ${profile.token}`);



var requestOptions = {
  method: 'GET',
  headers: myHeaders,

  redirect: 'follow'
};

fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}/comments`, requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    console.log("result",result)
    setComments(result.data);
  })
  .catch(error => console.log('error', error));
}
function fetchVote(id,token,method){
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: `${method}`,
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://academics.newtonschool.co/api/v1/quora/like/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

     
    } 
const handleVoteClick=(id,token)=>{
    const idCheck = voteArray.includes(id);
    
    if (!idCheck) {   
        const newIdArray=[...voteArray,id]    
        setVoteArray(newIdArray);
        fetchVote(id,token,"POST");  
        setClickedBtn('upvote')     
    }
    else{
        const newIdArray=voteArray.filter((item)=>item!==id)   
        setVoteArray(newIdArray);
        setClickedBtn('');
        fetchVote(id,token,"DELETE");
        
    }
    
}
const handleDownVoteClick=(id,token)=>{
    const idCheck = voteArray.includes(id);
    
    if (idCheck) {
        const newIdArray=voteArray.filter((item)=>item!==id)   
        setVoteArray(newIdArray);
        setClickedBtn('downvote')
        fetchVote(id,token,"DELETE");
   
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


    return(
        <div className="post" key={postData._id}>
            <div className="post_info">
            <Link to="/profile"><Avatar src={postData.author.profileImage} onClick={()=>setSelectedProfile(postData.author._id)}/></Link>
            <Link to="/profile"><h4 onClick={()=>setSelectedProfile(postData.author._id)}>{postData.author.name}</h4></Link>
            </div>
            <div className="post_body">
                <div className="post_question">
                    <h4>{postData.title}</h4>
                    <p>{postData.content}</p>               
                </div>
                <div className="post_footer">
                    <div className="post_footerActions">
                        <div className="post_footerAction">
                            <div className="upvote" id={clickedBtn==="upvote"?"upvoted":"noupvote"}onClick={()=>handleVoteClick(postData._id,profile.token)}>
                               {clickedBtn==="upvote"?(<BiSolidUpvote className="post_footer-up_btns" />):(<RxThickArrowUp className="post_footer-btns" />)} 
                                <small>Upvote. {postData.likeCount}</small>
                            </div>
                            <div className="downvote" onClick={()=>handleDownVoteClick(postData._id,profile.token)}>
                            {clickedBtn==="downvote"?(<BiSolidDownvote className="post_footer-down_btns"/>):(<RxThickArrowDown  className="post_footer-btns"/>)}
                            </div>
                        </div>
                        <div className="comment text-3xl" onClick={()=>handleComments(postData._id)}>
                            <BsChat />
                            <small>{postData.commentCount}</small>
                        </div>
                        <div className="share">
                            <RiLoopLeftLine />
                            {/* <small>69</small> */}
                           
                        </div>
                        <div className="post_more">
                            <BsThreeDots/>
                        </div>
                    </div>
                </div>
            
            </div>
            <div className={commentBoxClicked?"comments-section":"comments-section-hide" }>
                <div className="mycommentbox-section">
                    <div className="mycommentsBox_info">
                        <Avatar
                        src={profile.image?profile.image:""}/>
                
                    </div>
                    <input type="text" className="mycomments_typesection" placeholder="Add a comment..." value={replyComment} onChange={(e)=>setReplyComment(e.target.value)} />
                        
                    <button className="mycomments_addbtn"onClick={()=>postReplyComment(postData._id)}>Add comment</button>
                </div>
                {
                    comments&&comments.map((item)=>(
                        <div className="postcomment_question" key={item._id}>
                        <h4></h4>
                        <p>{item.content}</p>  
                        <div className="postcomment_footerAction">
                            <div className="upvote" onClick={()=>handleUpvoteClick(item._id,profile.token)}>
                                <RxThickArrowUp className="post_footer-btns" />
                               
                            </div>
                            <div className="downvote" onClick={()=>handleDownvoteClick(item._id,profile.token)}>
                                <RxThickArrowDown  className="post_footer-btns"/>
                            </div>

                        </div>  

                        </div>
                    ))
                }
               
            </div>
        </div>
    )
}

export default Post;