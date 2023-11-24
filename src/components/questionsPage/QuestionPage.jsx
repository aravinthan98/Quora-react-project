import './questionPage.scss'
import QuestionPageLeftSection from '../questionPageLeftSection/QuestionPageLeftSection';

import { useState } from 'react';
import { Outlet } from "react-router-dom"

function QuestionPage(){

    return(
        <div className='question-page-section'>
            <QuestionPageLeftSection/>
           
            <Outlet/>
          
        </div>
    )
}
export default QuestionPage;