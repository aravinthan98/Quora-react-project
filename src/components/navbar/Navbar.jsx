import React, { useState } from "react";
import "./navbar.scss";
import {BiSolidHome} from 'react-icons/bi';
import {IoIosListBox} from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import {SlNote} from 'react-icons/sl';
import {RiGroupLine} from 'react-icons/ri'
import {IoNotificationsOutline} from 'react-icons/io5';
import {GoSearch} from 'react-icons/go'
import Modal from '@mui/material/Modal';
import { Avatar, Button, Input, Stack } from "@mui/material";
import {MdOutlineLanguage} from 'react-icons/md';
import {BsPlus} from 'react-icons/bs';
import {MdOutlineExpandMore} from 'react-icons/md'
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import { HiUserGroup } from "react-icons/hi";



 const Navbar = () => {
 
  const{profile,setSearchVal}=useCurrentContext();
  const [openModal, setOpenModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const[postContent,setPostContent]=useState("");
  const[modelTab,setModelTab]=useState('question');
  const[inputValue,setInputValue]=useState('');
  const navigate=useNavigate();
  console.log("token",profile.token);
  console.log("name",profile.userName);

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
  function getInitials(name) {
    if (name.includes(' ')) {
      const [firstName, lastName] = name.split(' ');
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    } else {
      return name[0].toUpperCase();
    }
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
 
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: getInitials(name),
    };
  }

 const handleKeyPress=(event)=>{
  if(event.key==='Enter'){
    setSearchVal(event.target.value);
    return navigate('/search_results')
  }
 }
  return (
    <div className="navbar">
       <div className="navbar_logo">
       <Link to='/'><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/768px-Quora_logo_2015.svg.png?20170609154433"
            alt="logo"
            />  </Link>   
      </div> 
      <div className="navbar_icons">
        <Link to='/'><div className="navbar_icon">
          <BiSolidHome />
         
        </div></Link>
       <Link to="following"><div className="navbar_icon">
          <IoIosListBox/>       
        </div>
        </Link> 
        <Link to='/answer'><div className="navbar_icon">
        <SlNote/>
         
        </div></Link>
        <Link to='/spaces'> <div className="navbar_icon">
        <HiUserGroup />
        </div></Link>
        <Link to='/notifications'><div className="navbar_icon">
          <IoNotificationsOutline/>
        
        </div></Link>
      </div>
      <div className="navbar_input">
        <GoSearch/>
        <input type={"text"} placeholder="Search Quora" value={inputValue} 
        onChange={(e)=>setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
       
        />
      </div>
      <div className="navbar_right">
       <div className="navbar_tryout">
          Try Quora
          <BsPlus/>
        </div>
        <Link to='/login'><div className="navbar_avatar">
        <Stack direction="row" spacing={2}>
          <Avatar 
          // onClick={() => signOut(auth)}
          {...stringAvatar(profile.userName)}
            />
           </Stack>
        </div></Link>
        <div>
        <MdOutlineLanguage className="language-icon" />
        </div>
        <div className="h-add-quetion-btn">
        <Button onClick={() => setOpenModal(true)}>Add Question</Button>
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

export default Navbar;
