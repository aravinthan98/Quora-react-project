import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
const SearchResultSpaces=({spaceResult})=>{
    const{selectedChannel,setSelectedChannel}=useCurrentContext();

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
                        <div key={item._id}  className="border border-solid dark:bg-neutral-800 dark:border-zinc-600 dark:text-gray-300 bg-white border-gray-300">
                         <Link to="/channel_detail_page" state={`${item._id}`}><ListItem button key={item._id} 
                         onClick={()=>handleCardClick(item)}
                         
                         >
                             <ListItemAvatar>
                                <Avatar alt="Profile Picture" src={item.image} />
                            </ListItemAvatar>
                            <div>
                                <div>{item.name}</div>
                                <div className="text-sm dark:text-neutral-400">{item.description}</div>
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