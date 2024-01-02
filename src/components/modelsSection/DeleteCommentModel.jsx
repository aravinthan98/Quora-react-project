import { Modal } from "@mui/material";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";
import { DeleteComment } from "../../utilities/DeleteComment";

function DeleteCommentModel({commentId,onClickModel,value}){
    const{profile}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
    const handleDeleteComment=()=>{
        DeleteComment(commentId,profile.token);
        onClickModel();
    }
    return(
        <Modal
        open={value}
       
    >
      <div className="w-full h-full flex justify-center items-center">  
        <div className={` rounded-lg lg:w-auto w-full h-auto ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white text-neutral-800"}`}>       
          
            <div className="pt-0 px-3 pb-3">
              <h3 className="mx-4 mt-4 mb-1 p-0 font-bold text-lg">Delete </h3>
                <div className="mx-4">Are you sure you want to delete this comment?</div>
            </div>                
            <div className="flex justify-end py-4">
              <button className="h-9 px-5 rounded-3xl border-none outline-none font-medium text-sm mr-5 cursor-pointer hover:bg-blue-100"
                 onClick={onClickModel}      
              >Cancel</button>
              <button className={` h-9 px-5 rounded-3xl border-none outline-none  text-white font-medium text-sm mr-5 cursor-pointer bg-blue-600 hover:bg-blue-300 `} 
                 onClick={handleDeleteComment}
                
              >OK</button>
            </div>
        </div>   
      </div>
    </Modal>
    )
}
export default DeleteCommentModel;