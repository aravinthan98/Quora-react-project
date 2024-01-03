import { Modal } from "@mui/material";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";
import { DeleteChannel } from "../../utilities/DeleteChannel";
import { useNavigate } from "react-router-dom";

function DeleteChannelModel({spaceObj,onClickModel,value}){
    const{profile}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
    const navigate=useNavigate();

    const handleDeleteChannel=()=>{
        DeleteChannel(spaceObj._id,profile.token);
        onClickModel();
        return navigate("/spaces");
    }
    return(
        <Modal
        open={value}
       
    >
      <div className="w-full h-full flex justify-center items-center">  
        <div className={` rounded-lg lg:w-auto w-full h-auto ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white text-neutral-800"}`}>       
          
            <div className="pt-0 px-3 pb-3">
              <h3 className="mx-4 mt-4 mb-1 p-0 font-bold text-lg">Confirm Space Deletion</h3>
                <div className="mx-4"><span>Are you sure you want to delete</span> <span className="font-bold text-lg">{spaceObj.name}</span>?</div>
            </div>                
            <div className="flex justify-end py-4">
              <button className="h-9 px-5 rounded-3xl border-none outline-none font-medium text-sm mr-5 cursor-pointer hover:bg-blue-100"
                 onClick={onClickModel}      
              >Cancel</button>
              <button className={` h-9 px-5 rounded-3xl border-none outline-none  text-white font-medium text-sm mr-5 cursor-pointer bg-blue-600 hover:bg-blue-300 `} 
                 onClick={handleDeleteChannel}
                
              >Delete Space</button>
            </div>
        </div>   
      </div>
    </Modal>
    )
}
export default DeleteChannelModel;