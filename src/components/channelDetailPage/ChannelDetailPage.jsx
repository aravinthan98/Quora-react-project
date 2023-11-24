import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import {RxThickArrowUp} from 'react-icons/rx';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsChat} from 'react-icons/bs';
import {RiLoopLeftLine} from 'react-icons/ri';
import {BsThreeDots} from 'react-icons/bs';
import { useCurrentContext } from "../../context/currentContext";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import './ChannelDetailPage.scss';
function ChannelDetailPage(){

    const{selectedChannel,setSelectedChannel,profile}=useCurrentContext();
    const[channelDetails,setChannelDetails]=useState([]);
    const[channelPosts,setChannelPost]=useState([]);

    const[comments,setComments]=useState([]);
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);
    const[replyComment,setReplyComment]=useState('');
    const[voteArray,setVoteArray]=useState([]);
    const[clickedBtn,setClickedBtn]=useState('');
    const[channelTab,setChannelTab]=useState('channel-post');


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
  const fetchChannelPost=(id)=>{
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
        setChannelPost(result.data);
        console.log(result)
      } )
      .catch(error => console.log('error', error));
      
  }
  const fetchChannelDetail=(id)=>{
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
        setChannelDetails(result.data);
        fetchChannelPost(id); 
        console.log(result)
      } )
      .catch(error => console.log('error', error));
      
  }
  
    useEffect(()=>{
      console.log('selectedId',selectedChannel)
        if(selectedChannel){
        console.log('selectedId',selectedChannel)
        fetchChannelDetail(selectedChannel.id)
                  
        }
    },[selectedChannel])
    return(
        <div className="channel_detail-page">
          <div className="channel-detail-top_section">
            <div className="blur-section">
              {channelDetails.length!==0&&
              <img src={channelDetails.owner.profileImage}/>
              }   
              <div className="blur-content"></div>
            </div>
            <div className="channel-logo">
              {channelDetails.length!==0&&
              <img src={channelDetails.owner.profileImage}/>
              }       
            </div>
            <div className="channel-profile-sec">
                <img src={channelDetails.image}/>
                <h1>{channelDetails.name}</h1>
                <p>{channelDetails.description}</p>
            </div>
          </div>
           
          <div className="channel-detail-bottom-section">
            <div className="channel-detail-navbar-section">
              <div className={channelTab==="channel-about"?"channel-tab-selected":"channel-detail-tab"} onClick={()=>setChannelTab("channel-about")}>About</div>
              <div className={channelTab==="channel-post"?"channel-tab-selected":"channel-detail-tab"} onClick={()=>setChannelTab("channel-post")}>Post</div>
              <div className={channelTab==="channel-question"?"channel-tab-selected":"channel-detail-tab"} onClick={()=>setChannelTab("channel-question")}>Question</div>
            </div>
            <div className={channelTab==="channel-post"?"channel-post-section":"chennal-nosection"}>
            {channelPosts&&channelPosts.map((item)=>(
                 <div className="post" key={item._id}>
                 {/* <div className="post_info">
                 <Avatar src={item.images.length!==0?item.images[0]:""} />
                 <h4>{postData.author.name}</h4>
                 </div> */}
                 <div className="post_body">
                     <div className="post_question">
                        <h4>{item.title}</h4>
                        {/* <img src={item.images?item.images[0]:""}/>                         */}
                         <p>{item.content}</p>               
                     </div>
                     <div className="post_footer">
                         <div className="post_footerActions">
                             <div className="post_footerAction">
                                 <div className="upvote" id={clickedBtn==="upvote"?"upvoted":"noupvote"}onClick={()=>handleVoteClick(item._id,profile.token)}>
                                    {clickedBtn==="upvote"?(<BiSolidUpvote className="post_footer-up_btns" />):(<RxThickArrowUp className="post_footer-btns" />)} 
                                     <small>Upvote</small>
                                 </div>
                                 <div className="downvote" onClick={()=>handleDownVoteClick(item._id,profile.token)}>
                                 {clickedBtn==="downvote"?(<BiSolidDownvote className="post_footer-down_btns"/>):(<RxThickArrowDown  className="post_footer-btns"/>)}
                                 </div>
                             </div>
                             <div className="comment text-3xl" onClick={()=>handleComments(item._id)}>
                                 <BsChat />
                                 {/* <small>{postData.commentCount}</small> */}
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
            ))}
            </div>
            <div className={channelTab==="channel-about"?"channel-post-section":"chennal-nosection"}>
                      <h1>Comming Soon</h1>
            </div>
            <div className={channelTab==="channel-question"?"channel-post-section":"chennal-nosection"}>
                     <h1>Comming Soon</h1>
            </div>
            </div>
        </div>
    )
}
export default ChannelDetailPage;



