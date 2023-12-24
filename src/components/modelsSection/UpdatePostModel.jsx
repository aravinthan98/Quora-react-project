import { Modal } from "@mui/material";
import { useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { UpdatePost } from "../../utilities/UpdatePost";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";

function UpdatePostModel({object,onClickModel,value}){
    const[title,setTitle]=useState(object.title);
    const[content,setContent]=useState(object.content);
    const{profile}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
    const updatePost=(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("projectID", "f104bi07c490");
        myHeaders.append("Authorization", `Bearer ${profile.token}`);

        var formdata = new FormData();
        formdata.append("title", `${title}`);
        formdata.append("content", `${content}`);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const handleCreateSpace=()=>{
        updatePost(object.id);

        onClickModel()
    }
    return(
        <Modal
        open={value}
        onClose={onClickModel}  
    >
      <div className="w-full h-full flex justify-center items-center">  
        <div className={` rounded-lg lg:w-auto w-full h-auto ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white text-neutral-800"}`}> 
          <div className="leading-normal py-3 pr-2 pl-4 text-lg cursor-pointer w-97">
            <RxCross2 onClick={onClickModel}/>
          </div> 
          <div className="pl-3">
            <div className="pt-0 px-3 pb-3">
              <h3 className="m-0 p-0 font-bold text-lg">Edit Post</h3>
             
            </div>
           
            <div className="p-2">
              <label htmlFor="" className="font-medium text-base">Title</label>
              <br/>
              <input type="text" id="username"
              value={title}
               onChange={(e)=>setTitle(e.target.value)}
               className={`px-3 py-2 w-full rounded text-sm outline-none border border-solid  mt-2 hover:border-blue-600 ${darkMode?"bg-neutral-900 border-zinc-600":"bg-white border-gray-300"}`}

              />
              <br/>
              <small></small>
            </div>
            <div className="p-2 my-4">
              <label htmlFor="email" className="font-medium text-base">Content</label>
              <br/>
              <textarea className={`w-full outline-none border border-solid text-lg ${darkMode?"bg-neutral-900 border-zinc-600":"bg-white border-gray-300"}`} name="content" cols="30" rows="4"
               value={content}
               onChange={(e)=>setContent(e.target.value)}>                
              </textarea>
             
            </div>             
            <div className="flex justify-end py-4">
              <button className=" h-9 px-5 rounded-3xl border-none outline-none bg-blue-600 text-white font-medium text-sm mr-5 cursor-pointer hover:bg-zinc-700" 
                 onClick={handleCreateSpace}
              >Post</button>
            </div>
          </div>
        </div>   
      </div>
    </Modal>
    )
}
export default UpdatePostModel