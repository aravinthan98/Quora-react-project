
import React,{useState} from "react";
import "./QueryBox.scss";
import {BsQuestionSquare} from 'react-icons/bs';
import {SlNote} from 'react-icons/sl';
import {RxPencil1} from 'react-icons/rx';
import Modal from '@mui/material/Modal';
import { Avatar, Input } from "@mui/material";
import {MdOutlineExpandMore} from 'react-icons/md';
import {RiGroupLine} from 'react-icons/ri'
import { useCurrentContext } from "../../context/currentContext";

const QueryBox = () => {
  const{profile}=useCurrentContext();
  const [openModal, setOpenModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const[postContent,setPostContent]=useState("");
  const[modelTab,setModelTab]=useState('question')
//   const user = useSelector(selectUser);
const postData = async () => {
  var myHeaders = new Headers();
  myHeaders.append("projectID", "f104bi07c490");
  myHeaders.append("Authorization", `Bearer ${profile.token}`);
  
  var formdata = new FormData();
  formdata.append("content", `${postContent}`);
  formdata.append("title", `${postTitle}`);
  formdata.append("images", "");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://academics.newtonschool.co/api/v1/quora/post/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
  return (
    <div className="queryBox">
      <div className="queryBox-top-section">
      <div className="queryBox_info">
        <Avatar
        src={profile.image?profile.image:""}/>
  
      </div>
      <div className="queryBox_quora" onClick={() => setOpenModal(true)}>
        <p>What do you you want to ask or share?</p>
      </div>
      </div>
      <div className="queryBox_footer">
        <div className="ask-col flexrow" onClick={() => setOpenModal(true)}>
           <BsQuestionSquare/>
          <div className="btn-text">Ask</div>
        </div>
        <div className="ans-col flexrow" onClick={() => setOpenModal(true)}>
          <SlNote/>
          <div className="btn-text">Answer</div>
        </div>
        <div className="post-col flexrow" onClick={() => setOpenModal(true)}>
          <RxPencil1/>
          <div className="btn-text">Post</div>
        </div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          
        >
          <div className="modal_title">
          <div className="headings">
              <div className={modelTab==="question"?"headings-txt":"headings-txt-nobar"} onClick={()=>setModelTab('question')}>
              <h5>Add Question</h5>
              </div>
              <div className={modelTab==="post"?"headings-txt":"headings-txt-nobar"} onClick={()=>setModelTab('post')}>
              <h5>Create Post</h5>
              </div>
            </div>
            <div className={modelTab==="question"?"model-add_question":"model-add_question-hide"}>
              <div className="modal-tips">
                <h4>Tips on getting good answers quickly</h4>
                  <ul> 
                      <li>Make sure your question has not been asked already</li>
                      <li>Keep your question short and to the point</li>
                      <li>Double-check grammar and spelling</li>
                  </ul>
              </div>
              <div className="modal_info">
                <Avatar className="avatar" src={profile.userName?profile.userName:""} />
                <div className="modal_scope">
                  <div className="modal_scope-btns">
                    <RiGroupLine />
                  </div>
                  <p>public</p>
                  <div className="modal_scope-btns">
                  <MdOutlineExpandMore />
                  </div>
                </div>
              </div>
              <div className="modal_field">
                <Input
                  type="text"
                  value={postTitle}
                  required
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Start your question with 'what', 'How', 'Why' etc."
                />

              </div>
              <div className="modal_buttons">
                <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
                </button>
                <button type="submit" className="add" 
                onClick={postData}
                >
                  Add Question
                </button>
              </div>
            </div>
            <div className={modelTab==="post"?"model-create_post":"model-add_question-hide"}>
              <div className="model-post-top_section">
                <Avatar className="avatar" src={profile.image?profile.imaage:""} />
                <small>{profile.userName?profile.userName:""}</small>
              </div>
              <div className="model-post-bottom_section">
                  <textarea name="title" id="title" cols="30" rows="2" placeholder="title here..." onChange={(e)=>setPostTitle(e.target.value)}></textarea>
                  <textarea name="content" id="content" cols="30" rows="10" placeholder="Say something..." onChange={(e)=>setPostContent(e.target.value)}></textarea>
              </div>
              <div className="modal-scope_buttons">   
                <button type="submit" className="post-add" 
                onClick={postData}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QueryBox;
