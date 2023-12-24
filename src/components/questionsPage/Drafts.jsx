import React from "react";
import { useCurrentContext } from "../../context/currentContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Draft(){
    const{darkMode}=useSelector((state)=>state.mode)
    const{setQuestionTabSelected}=useCurrentContext();
    return (
        <div className="h-screen">
        <div className="font-sans flex lg:gap-8 gap-1">
            <div className={`lg:w-[572px] grid w-full place-items-center py-6 lg:px-1 text-center mt-32  {darkMode?"bg-neutral-900":"bg-gray-100"}`}>
                <div className="answerrequest-sec-image">
                    <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png" alt="topic-icone" className=" w-28"/>
                </div>
                <h3 className="mb-1 text-neutral-500">No answer drafts</h3>
                <p className={`text-base mb-6 ${darkMode?" text-neutral-400":""}`}>Start writing answers by finding questions to answer in Questions for You.</p>
                
                <Link to="/answer"><button className="py-0 px-5 m-0  outline-none  border border-solid border-blue-600 text-blue-600 font-bold h-9 rounded-full" onClick={()=>setQuestionTabSelected('QuestionForU')}>See questions for you</button></Link>
                
            </div>
            <div className={`lg:block hidden w-56 py-4  h-40 ${darkMode?"bg-neutral-800  text-neutral-400":"bg-[#fff] text-neutral-800"}`}>
                <h4 className={` text-base m-0 font-medium ${darkMode?"text-neutral-300":"text-neutral-800"}`}>Add topics you know about</h4>

                <p className="m-0 text-[13px] ">Adding topics helps us find questions for you to answer</p>
                <Link to='/commingsoon'>
                <button className="py-0 px-5 m-0  outline-none  border border-solid border-blue-600 text-blue-600 font-bold h-9 rounded-full mt-2">Add topics</button>
                </Link>
            </div>
        
        </div>
        </div>
    )
}
export default Draft;