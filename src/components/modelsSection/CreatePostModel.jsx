import React,{useState,useRef} from 'react';
import {RiGroupLine} from 'react-icons/ri'
import Modal from '@mui/material/Modal';
import { Avatar, Button, Input, Stack } from "@mui/material";
import {BsPlus} from 'react-icons/bs';
import {MdOutlineExpandMore} from 'react-icons/md'
import { useCurrentContext } from "../../context/currentContext";
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
function CreatePostModel({onClickModel,value}){
    const{profile}=useCurrentContext();
    const [postTitle, setPostTitle] = useState("");
    const[postContent,setPostContent]=useState("");
    const[modelTab,setModelTab]=useState('question');
    const{darkMode}=useSelector((state)=>state.mode)
    const[postQuestion,setPostQuestion]=useState("");
    const[addBtn,setAddBtn]=useState(true);
    const[postBtn,setPostBtn]=useState(true)
    

    const postData=()=> {
        
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);
        
        var formdata = new FormData();
        formdata.append("content", `${postContent}`);
        formdata.append("title", `${postTitle}`);
           
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://academics.newtonschool.co/api/v1/quora/post/", requestOptions)
          .then(response => response.text())
          .then((result) =>{ 
            onClickModel()
            })
          .catch(error => console.log('error', error));
      };
      const handlePostQuestion=(e)=>{
        console.log(addBtn);
        setPostQuestion(e.target.value);
        if(e.target.value.length!==0){
          setAddBtn(false);
        }
        else{
          setAddBtn(true);
        }
      }
      const handlePostBtn=(val1,val2)=>{
        if(val1&&val2){
          setPostBtn(false)
        }
        else{
          setPostBtn(true)
        }
      }
      const handlePostTitle=(e)=>{
        setPostTitle(e.target.value);
        handlePostBtn(e.target.value,postContent)
      }
      const handlePostContent=(e)=>{
        setPostContent(e.target.value);
        handlePostBtn(postTitle,e.target.value);
      }

    return(
        <Modal
            open={value}           
           className='flex justify-center items-center'
          >
            <div className={`outline-none box-border lg:h-auto lg:w-[55%] w-full h-full flex items-start flex-col border border-solid  rounded-lg ${darkMode?"bg-neutral-900 text-neutral-300 border-zinc-700":"bg-white text-neutral-800  border-zinc-200"}`}>
            <div className="leading-normal py-3 pr-2 pl-4 text-lg cursor-pointer">
              <RxCross2 onClick={onClickModel}/>
            </div>
              <div className={`w-full flex mt-2 border-b border-solid ${darkMode?"border-neutral-600":"border-neutral-300"}`}>
                <div className={modelTab==="question"?"w-full flex justify-center border-b-2 border-solid border-blue-500":"w-full flex justify-center"} onClick={()=>setModelTab('question')}>
                <h5 className='text-base cursor-pointer font-medium m-0 py-2'>Add Question</h5>
                </div>
                <div className={modelTab==="post"?"w-full flex justify-center border-b-2 border-solid border-blue-500":"w-full flex justify-center"} onClick={()=>setModelTab('post')}>
                <h5 className='text-base cursor-pointer font-medium m-0 py-2'>Create Post</h5>
                </div>
              </div>
              <div className={modelTab==="question"?"w-full":" hidden"}>
                <div className={`box-border rounded px-4 pt-4 pb-2   leading-normal mt-2 mr-4 ml-4 mb-2 ${darkMode?"bg-blue-600/20 text-blue-400":"bg-blue-200 text-blue-500"}`}>
                  <h4 className='m-0 font-medium'>Tips on getting good answers quickly</h4>
                    <ul className='mt-0 ml-2 text-sm'> 
                        <li>Make sure your question has not been asked already</li>
                        <li>Keep your question short and to the point</li>
                        <li>Double-check grammar and spelling</li>
                    </ul>
                </div>
                <div className="flex items-center ml-4">
                  <Avatar  src={profile.image?profile.image:""} />
                  <div className={`flex gap-1 py-1 px-2.5 ml-2.5 cursor-pointer rounded-3xl border border-solid ${darkMode?"text-gray-300 border-gray-600 ":"text-gray-600 border-gray-300"}`}>
                    <div className="flex justify-center items-center">
                      <RiGroupLine />
                    </div>
                    <p className="font-semibold">public</p>
                    <div className="flex justify-center items-center">
                    
                    </div>

                  </div>
                </div>
                <div className={` flex flex-col pt-5 pr-12 pl-3 ml-4 border-b w-11/12 border-solid ${darkMode?"text-gray-300 border-gray-600":"text-gray-800 border-gray-300"}`}>
                  <input
                    type="text"
                    value={postQuestion}
                    required
                    onChange={(e) => handlePostQuestion(e)}
                    placeholder="Start your question with 'what', 'How', 'Why' etc."
                    className={`outline-none ${darkMode?"bg-neutral-900":"bg-white"}`}
                  
                  />

                </div>
                <div className={`flex justify-end mt-16 w-full border-t border-solid gap-4 ${darkMode?"border-gray-700":"border-gray-200"}`}>
                  <button className="text-sm border-none outline-none my-2 text-slate-600 font-medium p-2 rounded-3xl cursor-pointer mr-5" onClick={() => setOpenModal(false)}>
                    
                  </button>
                  <button type="submit" 
                  disabled={addBtn}
                  className={`text-sm border-none outline-none my-2 text-white font-medium p-2 rounded-3xl cursor-pointer mr-5 hover:bg-blue-300 ${addBtn?"bg-blue-300":"bg-blue-500"}`} 
                  onClick={postData}
                  
                  >
                    Add Question
                  </button>
                </div>
              </div>
              <div className={modelTab==="post"?"w-full px-4 pt-4 mt-4":"hidden"}>
                <div className="flex pb-4 items-center">
                  <Avatar className="mr-2.5" src={profile.image?profile.imaage:""} />
                  <small className='font-medium text-sm'>{profile.userName?profile.userName:""}</small>
                </div>
                <div className={`pt-2.5 pl-1 ${darkMode?"text-gray-400":""}`}>
                    <textarea className={`w-full outline-none border-none text-lg ${darkMode?"bg-neutral-900":"bg-white"}`} name="title" id="title" cols="30" rows="2" placeholder="title here..." onChange={(e)=>handlePostTitle(e)}></textarea>
                    <textarea className={`w-full outline-none border-none text-lg ${darkMode?"bg-neutral-900":"bg-white"}`} name="content" id="content" cols="30" rows="4" placeholder="Say something..." onChange={(e)=>handlePostContent(e)}></textarea>
                </div>
                <div className={`w-full flex justify-end border-t border-solid  py-2 ${darkMode?"border-gray-600":"border-gray-200"}`}> 
                 
                  <button type="submit" className={`border-none outline-none text-white text-sm py-2.5 px-5 mr-5 rounded-3xl cursor-pointer hover:bg-blue-300 ${postBtn?"bg-blue-300":"bg-blue-500"}`} 
                  onClick={postData}
                  disabled={postBtn}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </Modal>
    )
}
export default CreatePostModel;