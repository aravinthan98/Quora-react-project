import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
function SearchResultAllPeople({result}){
    const{selectedSpace,setSelectedSpace}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode);
    const handleCardClick=(object)=>{      
        setSelectedSpace({
            ...selectedSpace,
            spaceName:`${object.name}`,
            id:`${object._id}`,
            image:`${object.image} `
        })            
    }
return(
    <div className="allpeople-search_result-section">
        <div className="allpeople-result-container">
        <List>
                {result.map((item)=>(
                    <div key={item._id}  className={`border border-solid ${darkMode?"bg-neutral-800 border-zinc-600 text-zinc-300":"bg-white border-gray-300 "}`}>
                     <Link to="/topic" state={`${item._id}`}><ListItem button key={item._id}
                     onClick={()=>handleCardClick(item)}>
                         <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={item.image} />
                        </ListItemAvatar>
                        <div>
                            <div>{item.name}</div>
                        </div>
                    </ListItem></Link>
                    </div>
                ))
                }
            </List>

            
        </div>
    </div>
)

}
export default SearchResultAllPeople;
