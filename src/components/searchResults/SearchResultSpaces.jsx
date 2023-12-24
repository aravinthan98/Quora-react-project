import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";
const SearchResultSpaces=({spaceResult})=>{
    const{selectedChannel,setSelectedChannel}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
    const navigate=useNavigate();

    const handleCardClick=(object)=>{
        setSelectedChannel({
            ...selectedChannel,
        channelName: `${object.name}`,
        id:`${object._id}`,
        image:`${object.image}`
        })
            
    }
    return(
        <div className="spaces-search_result-section">
            <div className="spaces-result-card_container">
            {
                spaceResult.length!==0?( <List>
                    {spaceResult.map((item)=>(
                        <div key={item._id}  className={`border border-solid ${darkMode?"bg-neutral-800 border-zinc-600 text-gray-300":"bg-white border-gray-300"}`}>
                         <Link to="/channel_detail_page" state={`${item._id}`}><ListItem button key={item._id} 
                         onClick={()=>handleCardClick(item)}
                         
                         >
                             <ListItemAvatar>
                                <Avatar alt="Profile Picture" src={item.image} />
                            </ListItemAvatar>
                            <div>
                                <div>{item.name}</div>
                                <div className={`text-sm ${darkMode?"text-neutral-400":""}`}>{item.description}</div>
                            </div>
                        </ListItem></Link>
                        </div>
                    ))
                    }
                </List>):(
                    <div className=" text-center"> No Result found</div>
                )
            }
           
            </div>
        </div>
    )
}
export default SearchResultSpaces;