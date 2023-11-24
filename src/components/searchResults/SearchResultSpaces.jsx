import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import './SearchResultSpaces.scss'
const SearchResultSpaces=({spaceResult})=>{
    const{selectedChannel,setSelectedChannel}=useCurrentContext();
    const navigate=useNavigate();

    const handleCardClick=(object)=>{
        setSelectedChannel({
            ...selectedChannel,
        channelName: `${object.name}`,
        id:`${object._id}`,
        image:`${object.image}`
        })
        
        return navigate('/channel_detail_page')
    }
    return(
        <div className="spaces-search_result-section">
            <div className="spaces-result-card_container">
            <List>
                {spaceResult.map((item)=>(
                     <ListItem button key={item._id} 
                     onClick={()=>handleCardClick(item)}
                     >
                         <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={item.image} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))
                }
            </List>
            </div>
        </div>
    )
}
export default SearchResultSpaces;