import React,{useState} from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Avatar, Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
function AddAnswer({onClickModel,value,content,id}){
    const{profile}=useCurrentContext();
    const[answerInput,setAnswerInput]=useState('');
    const{darkMode}=useSelector((state)=>state.mode);
    const[postBtn,setPostBtn]=useState(false);
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
    
    fetch(`https://academics.newtonschool.co/api/v1/quora/comment/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        console.log(result)})
      .catch(error => console.log('error', error));
    
      setAnswerInput('')
      onClickModel();
    }
    const handleAnswerInput=(e)=>{
      setAnswerInput(e.target.value);
      if(e.target.value.length!==0){
        setPostBtn(false)
      }
      else{
        setPostBtn(true);
      }
    }
    return(
        <Modal
            open={value}
            onClose={onClickModel}
            className='flex justify-center items-center'
        >
        <div className={`outline-none box-border lg:w-[55%] w-full lg:h-96 flex items-start flex-col rounded-lg border border-solid ${darkMode?"bg-neutral-900 text-zinc-300 border-zinc-700":"bg-white border-zinc-300"}`}>
            <div className="leading-normal pt-4 pb-1.5 pr-2 pl-4 text-lg cursor-pointer">
            <RxCross2 onClick={onClickModel} className="text-2xl"/>
            </div>   
            <div className={`box-border lg:h-full w-full mb-1 px-4 flex flex-col justify-between ${darkMode?"bg-neutral-900":"bg-white"}`}>
                <div className="flex pb-4 items-center pl-2">
                    <Avatar className="mr-2.5" src={profile.image?profile.imaage:""} />
                    <small className='font-medium text-sm'>{profile.userName?profile.userName:""}</small>
                </div>
                <div className=' pt-1.5 pl-2'>
                <h4 className="text-xl font-bold pb-2">{content}</h4>
                <textarea name="content" id="content" cols="30" rows="7" className={` outline-none w-full ${darkMode?"bg-neutral-900":"bg-white"}`} placeholder="Write Your answer" value={answerInput} onChange={(e)=>handleAnswerInput(e)}></textarea>
                </div>
                <div className={`w-full flex justify-end mr-2.5 ml-auto border-t border-solid  ${darkMode?"border-gray-600":"border-gray-200"}`}>   
                    <button type="submit" className={`border-none my-2 outline-none text-white font-medium py-2.5 px-5 mr-5 rounded-3xl cursor-pointer hover:bg-blue-300 ${postBtn?"bg-blue-300": "bg-blue-500"}`}
                    onClick={answerPost}
                    disabled={postBtn}
                    >Post
                    </button>
                </div>
            </div>
        </div>
      </Modal>
    )
}
export default AddAnswer;