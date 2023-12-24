import React from "react";
import {LuPen} from 'react-icons/lu'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function QuestionPageAddTopicSection(){
    const{darkMode}=useSelector((state)=>state.mode)

    return(
        <div className="font-sans lg:w-56 lg:block hidden">
            
            <div className={`flex justify-between pb-2 border-b border-solid border-gray-200 ${darkMode?" text-zinc-300":"text-black"}`}>
                <div>Topics you know about</div>
                <Link to='/commingsoon'>
                <div className=" rounded-full px-2 py-1 border border-solid border-zinc-400">
                    <button className=" text-base border-none p-0"><LuPen/></button>
                </div>
                </Link>
            </div>
            <div>
                <div className={`text-center mt-2 py-6 ${darkMode?"bg-neutral-800 text-neutral-400":" bg-[#fff]"}`}>
                    <div className="flex justify-center mb-1">
                        <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png" alt="topic-icone" className=" w-12"/>
                    </div>
                    <h4 className="mb-1 mx-0 mt-0">No topics yet</h4>
                    <p className=" text-[13px] pb-6 m-0">You’ll get better questions if you add more specific topics.</p>
                    
                    <Link to='/commingsoon'>
                        <button className="py-0 px-5 m-0  outline-none  border border-solid border-blue-600 text-blue-600 font-bold h-9 rounded-full">Add topics</button>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default QuestionPageAddTopicSection;