import SearchResultAllPeople from "./SearchResultAllPeople";
import SearchResultAnswer from "./SearchResultAnswer";
import SearchResultQuestion from "./SearchResultQuestion";
import SearchResultSpaces from "./SearchResultSpaces";
import { useSelector } from "react-redux";

function SearchResultAllType({question,answer,space,channel}){
    const{darkMode}=useSelector((state)=>state.mode);
return(
    <div className={`h-full ${darkMode?"bg-neutral-900":"bg-white"}`}>
        
        <SearchResultQuestion posts={question}/>
        <SearchResultAnswer postData={answer}/>
        <SearchResultSpaces spaceResult={space}/>
        <SearchResultAllPeople result={channel}/>
    </div>
)
}
export default SearchResultAllType;