
import QuestionPageLeftSection from './QuestionPageLeftSection';
import React from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import MobileQuestionPageNav from './mobileQuestionpageNav';

function QuestionPage(){
    const{darkMode}=useSelector((state)=>state.mode);
    return(
        <div className={`lg:mt-12 mt-24 h-full transition-all duration-500 ease-in-out ${darkMode?" bg-neutral-900":"bg-gray-100"}`}>
            <div className="flex lg:flex-row flex-col pt-2 lg:pt-7 lg:w-10/12 lg:mx-auto w-full gap-1">
                <QuestionPageLeftSection/>
               <div className='lg:hidden block h-12 '>
                <MobileQuestionPageNav/>
                </div>
                <div className="lg:ml-48 ml-1">
                    <Outlet/>
                </div>
                
            </div>
        </div>
    )
}
export default QuestionPage;