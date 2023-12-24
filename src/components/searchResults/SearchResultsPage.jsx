import React, { useEffect, useState } from "react";
import './SearchResultsPage.scss';
import SearchResultQuestion from "./SearchResultQuestion";
import SearchResultAnswer from "./SearchResultAnswer";
import SearchResultSpaces from "./SearchResultSpaces";
import SearchResultAllPeople from "./SearchResultAllPeople";
import SearchResultAllType from "./SearchResultAlltype";
import axios from "axios";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";

function SearchResultsPage(){
    const{searchVal}=useCurrentContext();
    const[noteTabSelected,setNoteTabSelected]=useState('alltype')
    const[questionResults,setQuestionResults]=useState([]);
    const[answerResults,setAnswerResults]=useState([]);
    const[spaceResults,setSpaceResults]=useState([]);
    const[allPeopleResults,setAllPeopleResults]=useState([]);
    const{darkMode}=useSelector((state)=>state.mode)

  
    
    const fetchQuestionData=async(val)=>{
       
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"title":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
         
            setQuestionResults(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }  

          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
            const newObjArr= response.data.data.map((item)=>({
              author_id:item.author._id,
              author_name:item.author.name,
              author_image:item.author.profileImage,
              title:item.title,
              content:item.content,
              likeCount:item.likeCount,
              commentCount:item.commentCount,
              id:item._id
            }));
            setAnswerResults(newObjArr);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/channel?search={"name":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
            
            setSpaceResults(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }  
          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/channel?search={"name":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
          
            setAllPeopleResults(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }  
    }

    useEffect(()=>{
        console.log("searchVal",searchVal);
    
       if(searchVal){
            fetchQuestionData(searchVal);
       }
    },[searchVal])
    let resultComponent;
    switch(noteTabSelected){
        case "Question":
            resultComponent=<SearchResultQuestion posts={questionResults}/>;
            break;
        case "Answer":
            resultComponent=<SearchResultAnswer postData={answerResults}/>
            break;
        case "spaces":
            resultComponent=<SearchResultSpaces spaceResult={spaceResults}/>
            break;
        case "Author":
            resultComponent=<SearchResultAllPeople result={allPeopleResults}/>
            break;
        default:
            resultComponent=<SearchResultAllType question={questionResults} answer={answerResults} 
            space={spaceResults} channel={allPeopleResults}/>
    }
    return(
    
      <div className={`search_result-page ${darkMode?"bg-neutral-900 text-zinc-300":"bg-gray-100"}`}>
        <div className="search_result-page-container">
            <div className="result-page-sidenav lg:w-40 lg:block hidden">           
                <div className={`question-lefttitle border-b border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>By types</div>
                <div className={noteTabSelected==="alltype"?`selected-q-tab ${darkMode?" text-red-600":"text-red-700"}`:`q-left-flex ${darkMode?"text-zinc-400":"text-zinc-700"}`} onClick={()=>setNoteTabSelected('alltype')}>All types</div>            
                <div className={noteTabSelected==="Question"?`selected-q-tab ${darkMode?" text-red-600":"text-red-700"}`:`q-left-flex ${darkMode?"text-zinc-400":"text-zinc-700"}`} onClick={()=>setNoteTabSelected('Question')}>Questions</div>
                <div className={noteTabSelected==="Answer"?`selected-q-tab ${darkMode?" text-red-600":"text-red-700"}`:`q-left-flex ${darkMode?"text-zinc-400":"text-zinc-700"}`} onClick={()=>setNoteTabSelected('Answer')}>Answer</div>              
                <div className={noteTabSelected==="spaces"?`selected-q-tab ${darkMode?" text-red-600":"text-red-700"}`:`q-left-flex ${darkMode?"text-zinc-400":"text-zinc-700"}`} onClick={()=>setNoteTabSelected('spaces')}>Spaces</div>              
                <div className={`question-lefttitle border-b border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>By author</div>                
               <div className={noteTabSelected==="Author"?`selected-q-tab ${darkMode?" text-red-600":"text-red-700"}`:`q-left-flex ${darkMode?"text-zinc-400":"text-zinc-700"}`} onClick={()=>setNoteTabSelected('Author')}>All people</div>     
            </div>
            <div className="lg:w-1/2 lg:ml-80 ml-0 w-full">
                {resultComponent}
            </div>
        </div>
    </div>
 
    )
}
export default SearchResultsPage;