import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function SearchResultAllPeople({result}){
return(
    <div className="allpeople-search_result-section">
        <div className="allpeople-result-container">
        <List>
                {result.map((item)=>(
                     <ListItem button key={item._id}>
                         <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={item.image} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                ))
                }
            </List>

            
        </div>
    </div>
)

}
export default SearchResultAllPeople;
