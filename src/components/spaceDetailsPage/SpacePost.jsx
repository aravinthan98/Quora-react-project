import React,{ useState,useEffect } from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Avatar } from "@mui/material";
import {RxThickArrowUp} from 'react-icons/rx';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsChat} from 'react-icons/bs';
import {RiLoopLeftLine} from 'react-icons/ri';
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import {BsThreeDots} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";


function SpacePost(){
    const{profile,selectedSpace,selectedProfile,setSelectedProfile}=useCurrentContext()
    const[posts,setPosts]=useState([]);
    const[comments,setComments]=useState([]);
    const[commentBoxClicked,setCommentBoxClicked]=useState(false);
    const[replyComment,setReplyComment]=useState('');
    const[voteArray,setVoteArray]=useState([]);
    const[clickedBtn,setClickedBtn]=useState('')
    const navigate=useNavigate();
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
    })
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
      .then((result) => {

      })
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
    const getposts=(id)=>{
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
            setPosts(result.data);
            })
        .catch(error => console.log('error', error));
    }
    const handleProfile=(item)=>{
        setSelectedProfile({
            ...selectedProfile,
            // profileName:`${item.author.name}`,
            id:`${item.author}`,
            // image:`${item.author.profileImage}`
        })
        return navigate('/profile');
    }
    useEffect(()=>{
        if(selectedSpace){
            getposts(selectedSpace.id);
        }
    },[selectedSpace])
    return(
        <div>
            <div>
                <div> 
                    <div>
                    {
                        posts&& posts.map((item)=>(
                            <div className="flex flex-col px-3 pt-3 bg-white rounded border border-solid border-gray-200" key={item._id}>
                                <div className="box-border flex">
                                    <div className="box-border flex mb-2">
                                        <img src={selectedSpace.image} className="w-9 h-9 rounded-full mr-2" onClick={()=>handleProfile(item)} />
                                        <h4 className="font-bold text-[13px] text-gray-950" onClick={()=>handleProfile(item)}>{selectedSpace.spaceName}</h4>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Link to='/question-detailpage' state={item}>
                                            <div className="box-border mb-1 font-bold text-base">{item&&item.title}</div>
                                        </Link>
                                        <div>{item&&item.content}</div>               
                                    </div>
                                    <div>
                                        {item.images&&<img src={item.images[0]?item.images[0]:""}/>}
                                    </div>
                                    <div>
                                        <div className="box-border flex px-3 flex-nowrap justify-between py-1">
                                            <div className="flex items-center cursor-pointer">
                                                <div className="box-border flex mr-2 h-8 bg-zinc-100 rounded-full border-r border-solid border-gray-200">
                                                    <div className="box-border flex items-center px-2 h-8 " id={clickedBtn==="upvote"?"upvoted":"noupvote"}onClick={()=>handleVoteClick(item._id,profile.token)}>
                                                    {clickedBtn==="upvote"?(<BiSolidUpvote className="text-2xl" />):(<RxThickArrowUp className="text-2xl" />)} 
                                                        <span className="text-[13px] font-medium ml-1">Upvote.</span>
                                                    </div>
                                                    <div className="h-8 border border-solid border-zinc-200"></div>
                                                    <div className="box-border flex items-center justify-center px-2 pb-1 h-8" onClick={()=>handleDownVoteClick(item._id,profile.token)}>
                                                    {clickedBtn==="downvote"?(<BiSolidDownvote className="text-2xl"/>):(<RxThickArrowDown  className="text-2xl"/>)}
                                                    </div>
                                                </div>
                                                <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2" onClick={()=>handleComments(item._id)}>
                                                    <BsChat className="text-lg" />
                                                    
                                                </div>
                                                <div className="box-border flex items-center h-8 min-w-8 px-1 mr-2">
                                                    <RiLoopLeftLine className="text-xl" />
                                                    {/* <small>69</small> */}
                                                
                                                </div>
                                            </div>
                                            <div className="box-border flex items-center h-8 min-w-8 px-1e">
                                                <BsThreeDots className="text-xl"/>
                                            </div>
                                        </div>
                                    </div>                               
                                </div>
                                <div className={commentBoxClicked?"block":"hidden" }>
                                    <div className="mycommentbox-section">
                                        <div className="mycommentsBox_info">
                                            <Avatar
                                            src={profile.image?profile.image:""}/>
                                    
                                        </div>
                                        <input type="text" className="mycomments_typesection" placeholder="Add a comment..." value={replyComment} onChange={(e)=>setReplyComment(e.target.value)} />
                                            
                                        <button className="mycomments_addbtn"onClick={()=>postReplyComment(item._id)}>Add comment</button>
                                    </div>
                                    {
                                        comments&&comments.map((item)=>(
                                            <div className="postcomment_question" key={item._id}>
                                            <h4></h4>
                                            <p>{item.content}</p>  
                                            <div className="postcomment_footerAction">
                                                <div className="upvote" onClick={()=>handleVoteClick(item._id,profile.token)}>
                                                    <RxThickArrowUp className="post_footer-btns" />
                                                
                                                </div>
                                                <div className="downvote" onClick={()=>handleDownVoteClick(item._id,profile.token)}>
                                                    <RxThickArrowDown  className="post_footer-btns"/>
                                                </div>

                                            </div>  

                                            </div>
                                        ))
                                    }
                                
                                </div>
                            </div>
                        ))
                    }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpacePost;
