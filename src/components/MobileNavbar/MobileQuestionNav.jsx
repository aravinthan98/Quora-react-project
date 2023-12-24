import React from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function MobileQuestionNav(){
    const{questionTabSelected,setQuestionTabSelected}=useCurrentContext();
    const{darkMode}=useSelector((state)=>state.mode)
 
    return (
        <div className="box-border fixed transition-all duration-500 ease-in-out w-full h-12 block lg:hidden ">
            <div className="flex justify-evenly px-2 w-full h-full">
                <div className={`h-full grid place-items-center ${questionTabSelected==="QuestionForU"?"text-red-600 border-b-4 border-solid border-red-600 font-medium":"text-zinc-400"}`}>
                    <Link to="" className="no-underline">
                        <div className="w-full h-full cursor-pointer font-medium"
                    onClick={()=>setQuestionTabSelected('QuestionForU')}>For you</div>
                    </Link>
                </div>
                <div className={`h-full grid place-items-center ${questionTabSelected==="AnswerRequest"?"text-red-600 border-b-4 border-solid border-red-600 font-medium":"text-zinc-400"}`}>
                    <Link to='request'>
                    <div className="w-full h-full cursor-pointer font-medium"
                    onClick={()=>setQuestionTabSelected('AnswerRequest')}>Requests</div>
                    </Link>
                </div>
                <div className={`h-full grid place-items-center ${questionTabSelected==="Drafts"?"text-red-600 border-b-4 border-solid border-red-600 font-medium":"text-zinc-400"}`}>
                    <Link to='draft'>
                    <div className="w-full h-full cursor-pointer font-medium"
                        onClick={()=>setQuestionTabSelected('Drafts')}>Drafts</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default MobileQuestionNav;