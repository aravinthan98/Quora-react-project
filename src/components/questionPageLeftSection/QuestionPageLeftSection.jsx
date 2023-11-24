
import React from "react";
import './questionPageLeftSection.scss'
import { useCurrentContext } from "../../context/currentContext";
import { Link } from "react-router-dom";

function QuestionPageLeftSection(){
    const{questionTabSelected,setQuestionTabSelected}=useCurrentContext();

 
    return (
        <div className="questionpage-leftsection">
             <div className="question-lefttitle">Questions</div>
             <Link to=""> <div className={questionTabSelected==="QuestionForU"?"selected-q-tab":"q-left-flex"} onClick={()=>setQuestionTabSelected('QuestionForU')}>Questions for you</div>
             </Link>
            <Link to='request'><div className={questionTabSelected==="AnswerRequest"?"selected-q-tab":"q-left-flex"} onClick={()=>setQuestionTabSelected('AnswerRequest')}>Answer requests</div>
            </Link>
            <Link to='draft'><div className={questionTabSelected==="Drafts"?"selected-q-tab":"q-left-flex"} onClick={()=>setQuestionTabSelected('Drafts')}>Drafts</div>
            </Link>
        </div>
    )
}
export default QuestionPageLeftSection;