import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
function SearchResultAllPeople({result}){
    const{selectedSpace,setSelectedSpace}=useCurrentContext();
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
                    <div key={item._id}  className="border border-solid dark:bg-neutral-800 dark:border-zinc-600 dark:text-zinc-300 bg-white border-gray-300">
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
