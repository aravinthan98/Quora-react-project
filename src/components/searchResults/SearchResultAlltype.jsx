import SearchResultAllPeople from "./SearchResultAllPeople";
import SearchResultAnswer from "./SearchResultAnswer";
import SearchResultQuestion from "./SearchResultQuestion";
import SearchResultSpaces from "./SearchResultSpaces";

function SearchResultAllType({question,answer,space,channel}){
   
return(
    <div className="h-full dark:bg-neutral-900 bg-white">
        
        <SearchResultQuestion posts={question}/>
        <SearchResultAnswer postData={answer}/>
        <SearchResultSpaces spaceResult={space}/>
        <SearchResultAllPeople result={channel}/>
    </div>
)
}
export default SearchResultAllType;