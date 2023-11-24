import React,{useState,useEffect,useRef} from "react";
import {TfiRssAlt} from 'react-icons/tfi';
import {PiPencilSimpleSlashLight} from 'react-icons/pi'
import {TbSquareAsteriskFilled} from 'react-icons/tb';
import {SlNote} from 'react-icons/sl';
import {RxThickArrowDown} from 'react-icons/rx';
import {BsThreeDots} from 'react-icons/bs'
import AnswerRequest from "../answerRequest/AnswerRequests";
import QuestionPageAddTopicSection from "../questionPageAddTopicSection/questionPageAddTopic";
import Modal from '@mui/material/Modal';
import { Avatar } from "@mui/material";
import {RxCross2} from 'react-icons/rx';
import { BiSolidDownvote } from "react-icons/bi";
import { useCurrentContext } from "../../context/currentContext";
import './SearchResultQuestion.scss'
 
function SearchResultQuestion({posts}){
  const{profile}=useCurrentContext();
    
    const[openModal,setOpenModal]=useState(false);
    const[question,setQuestion]=useState('');
    const[answerInput,setAnswerInput]=useState('')
    const[postId,setPostId]=useState('');
    const[followState,setFollowState]=useState([]);
    const[downVoteArray,setDownVoteArray]=useState([])
   
    const answerPost=()=>{
      var myHeaders = new Headers();
  myHeaders.append("projectID", "f104bi07c490");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${profile.token}`);
  
  var raw = JSON.stringify({
    "content": `${answerInput}`
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://academics.newtonschool.co/api/v1/quora/comment/${postId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      
      console.log(result)})
    .catch(error => console.log('error', error));
  
    setAnswerInput('')
    setOpenModal(false);
  }

    const handleClickAnswer=(ques,id)=>{
      setOpenModal(true);
      setQuestion(ques);
      setPostId(id);
    }
    function fetchFollowing(id,method){
      var myHeaders = new Headers();
      myHeaders.append("projectID", "f104bi07c490");
      myHeaders.append("Authorization", `Bearer ${profile.token}`);

      var requestOptions = {
        method: `${method}`,
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://academics.newtonschool.co/api/v1/quora/follow/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const getFollowUser=(id)=>{
      if(followState.includes(id)){
        const newIdArray=followState.filter((item)=>item!==id);
        setFollowState(newIdArray);
        fetchFollowing(id,"DELETE");
      }
      else{
        
        const newIdArray=[...followState,id]
        setFollowState(newIdArray);
        fetchFollowing(id,"POST");
        
      }
      
    }
    function fetchVote(id,token){
      var myHeaders = new Headers();
      myHeaders.append("projectID", "f104bi07c490");
      myHeaders.append("Authorization", `Bearer ${token}`);
      
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`https://academics.newtonschool.co/api/v1/quora/like/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
       
      } 
    const handleDownVoteClick=(id,token)=>{
      const idCheck = downVoteArray.includes(id);
      if (!idCheck) {   
        const newIdArray=[...downVoteArray,id]    
        setDownVoteArray(newIdArray);
        fetchVote(id,token);      
      }
    else{
          const newIdArray=downVoteArray.filter((item)=>item!==id)   
          setDownVoteArray(newIdArray);
 
    }
    
  }
    return(

      <div className="search_result-question-section">
        <div className="question-result-container">
            <div className="question-for-u-section-left">
            <div className="question-for-u-title">
               
                <p>Result for</p>
            </div>
            {posts.map((item)=>(
            <div className="question-for-u-card" key={item._id}>
                <h4>{item.title}</h4>
                <p>No answer yet</p>
                <div className="question-for-u-card-btns">
                    <div className="q-for-u-card-btns-left">
                        <div className="q-for-u-card-btns"  onClick={()=>handleClickAnswer(item.title,item._id)} ><SlNote/> <h4>Answer</h4></div>
                        <div className="q-for-u-card-btns" id={followState.includes(item.author._id)?"follow":"notfollw"}  onClick={()=>getFollowUser(item.author._id)}><TfiRssAlt/><h4>Follow</h4></div>
                        <div className="q-for-u-card-btns"><PiPencilSimpleSlashLight/><h4>Post</h4></div>
                    </div>
                    <div className="q-for-u-card-btns-right">
                        <div className="q-for-u-card-btns-left" onClick={()=>handleDownVoteClick(item._id,profile.token)}>{downVoteArray.includes(item._id)?(<BiSolidDownvote className="vote-down-btn" />):(<RxThickArrowDown/>)}</div>
                        <div className="q-for-u-card-btns-left"><BsThreeDots/></div>
                    </div>

                </div>
            </div>
            ))}
            </div>
           
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}  
            >
          <div className="modal_title">
          <div className="signup-close-icone">
              <RxCross2 onClick={()=>setOpenModal(false)}/>
          </div> 
            <div className="model-create_post">
              <div className="model-post-top_section">
                <Avatar className="avatar" src={profile.image?profile.imaage:""} />
                <small>{profile.userName?profile.userName:""}</small>
              </div>
              <div className="model-post-bottom_section">
                 <h4>{question}</h4>
                  <textarea name="content" id="content" cols="30" rows="10" placeholder="Write Your answer" value={answerInput} onChange={(e)=>setAnswerInput(e.target.value)}></textarea>
              </div>
              <div className="modal-scope_buttons">   
                <button type="submit" className="post-add" 
               onClick={answerPost}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Modal>
        </div>
      </div>
    )
}
export default SearchResultQuestion;