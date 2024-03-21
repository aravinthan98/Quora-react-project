import QuestionPageLeftSection from './QuestionPageLeftSection';
import React from 'react';
import { Outlet } from "react-router-dom";
import MobileQuestionNav from '../MobileNavbar/MobileQuestionNav';

function QuestionPage(){
    return(
        <div className="lg:mt-12 mt-24 h-full transition-all duration-500 ease-in-out dark:bg-neutral-900 bg-gray-100">
            <div className="flex lg:flex-row flex-col pt-2 lg:pt-7 lg:w-10/12 lg:mx-auto w-full gap-1">
                <QuestionPageLeftSection/>
               <div className='lg:hidden block h-12 '>
                <MobileQuestionNav/>
                </div>
                <div className="lg:ml-48 lg:w-3/4 ml-1">
                    <Outlet/>
                </div>
                
            </div>
        </div>
    )
}
export default QuestionPage;