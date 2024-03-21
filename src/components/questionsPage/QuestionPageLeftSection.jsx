import React from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Link } from "react-router-dom";
function QuestionPageLeftSection(){
    const{questionTabSelected,setQuestionTabSelected}=useCurrentContext();
 
    return (
        <div className="fixed transition-all duration-500 ease-in-out lg:w-44 lg:block hidden">
             <div className="py-2.5 px-4 border-b border-solid  mb-1 font-medium dark:text-neutral-400 dark:border-gray-700 text-black border-gray-300">Questions</div>
             <Link to="" className="no-underline">
                <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${questionTabSelected==="QuestionForU"?"dark:text-red-600 dark:bg-red-700/10 dark:font-medium text-red-700 bg-red-800/10":"dark:text-zinc-400 text-zinc-500"}`}
              onClick={()=>setQuestionTabSelected('QuestionForU')}>Questions for you</div>
             </Link>
            <Link to='request'>
            <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${questionTabSelected==="AnswerRequest"?"dark:text-red-600 dark:bg-red-700/10 dark:font-medium text-red-700 bg-red-800/10":"dark:text-zinc-400 text-zinc-500"}`}
             onClick={()=>setQuestionTabSelected('AnswerRequest')}>Answer requests</div>
            </Link>
            <Link to='draft'>
            <div className={`text-[13px] w-full py-1 pl-4 mb-1 rounded cursor-pointer font-medium  hover:bg-zinc-300 ${questionTabSelected==="Drafts"?"dark:text-red-600 dark:bg-red-700/10 dark:font-medium text-red-700 bg-red-800/10":"dark:text-zinc-400 text-zinc-500"}`}
             onClick={()=>setQuestionTabSelected('Drafts')}>Drafts</div>
            </Link>
        </div>
    )
}
export default QuestionPageLeftSection;