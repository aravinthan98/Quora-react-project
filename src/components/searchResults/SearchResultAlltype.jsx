import SearchResultAllPeople from "./SearchResultAllPeople";
import SearchResultAnswer from "./SearchResultAnswer";
import SearchResultQuestion from "./SearchResultQuestion";
import SearchResultSpaces from "./SearchResultSpaces";

function SearchResultAllType({question,answer,space,channel}){
return(
    <div className="alltype-search_result-section">
        
        <SearchResultQuestion posts={question}/>
        <SearchResultAnswer postData={answer}/>
        <SearchResultSpaces spaceResult={space}/>
        <SearchResultAllPeople result={channel}/>
    </div>
)
}
export default SearchResultAllType;