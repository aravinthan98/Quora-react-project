import React from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function QuestionPageLeftSection(){
    const{questionTabSelected,setQuestionTabSelected}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
 
    return (
        <div className="fixed transition-all duration-500 ease-in-out lg:w-44 lg:block hidden">
             <div className={`py-2.5 px-4 border-b border-solid  mb-1 font-medium ${darkMode?" text-neutral-400 border-gray-700":"text-black border-gray-300"}`}>Questions</div>
             <Link to="" className="no-underline">
                <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${darkMode?`${questionTabSelected==="QuestionForU"?"text-red-600 bg-red-700/10 font-medium":"text-zinc-400"}`:`${questionTabSelected==="QuestionForU"?"text-red-700 bg-red-800/10":"text-zinc-500"}`} `}
              onClick={()=>setQuestionTabSelected('QuestionForU')}>Questions for you</div>
             </Link>
            <Link to='request'>
            <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${darkMode?`${questionTabSelected==="AnswerRequest"?"text-red-600 bg-red-700/10 font-medium":"text-zinc-400"}`:`${questionTabSelected==="AnswerRequest"?"text-red-700 bg-red-800/10":"text-zinc-500"}`} `}
             onClick={()=>setQuestionTabSelected('AnswerRequest')}>Answer requests</div>
            </Link>
            <Link to='draft'>
            <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${darkMode?`${questionTabSelected==="Drafts"?"text-red-600 bg-red-700/10 font-medium":"text-zinc-400"}`:`${questionTabSelected==="Drafts"?"text-red-700 bg-red-800/10":"text-zinc-500"}`} `}
             onClick={()=>setQuestionTabSelected('Drafts')}>Drafts</div>
            </Link>
        </div>
    )
}
export default QuestionPageLeftSection;