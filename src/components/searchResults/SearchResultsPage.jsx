import React, { useEffect, useState } from "react";
import './SearchResultsPage.scss';
import SearchResultQuestion from "./SearchResultQuestion";
import SearchResultAnswer from "./SearchResultAnswer";
import SearchResultSpaces from "./SearchResultSpaces";
import SearchResultAllPeople from "./SearchResultAllPeople";
import SearchResultAllType from "./SearchResultAlltype";
import axios from "axios";
import { useCurrentContext } from "../../context/currentContext";



function SearchResultsPage(){
    const{searchVal}=useCurrentContext();
    const[noteTabSelected,setNoteTabSelected]=useState('')
    const[questionResults,setQuestionResults]=useState([]);
    const[answerResults,setAnswerResults]=useState([]);
    const[spaceResults,setSpaceResults]=useState([]);
    const[allPeopleResults,setAllPeopleResults]=useState([]);


  
    
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
          
            setAnswerResults(response.data.data);
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
        <div className="search_result-page">
        <div className="search_result-page-container">
            <div className="result-page-sidenav">           
                <div className="question-lefttitle">By types</div>
                <div className={noteTabSelected==="alltype"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('alltype')}>All types</div>            
                <div className={noteTabSelected==="Question"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Question')}>Questions</div>
                <div className={noteTabSelected==="Answer"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Answer')}>Answer</div>              
                <div className={noteTabSelected==="spaces"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('spaces')}>Spaces</div>              
                <div className="question-lefttitle">By author</div>                
               <div className={noteTabSelected==="Author"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Author')}>All people</div>     
            </div>
            <div className="search_result-page-content">
                {resultComponent}
            </div>
        </div>

    </div>
    )
}
export default SearchResultsPage;