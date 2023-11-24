import React from "react";
import './answerRequests.scss';
function AnswerRequests(){
    return(
        <div className="questionPage-main-section">
        <div className="answerrequest-sec-content">
                <div className="answerrequest-sec">
                    <div className="answerrequest-sec-image">
                        <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png" alt="topic-icone"/>
                    </div>
                    <h3>Answer Requests</h3>
                    <p>Ask for answers from other users by clicking Request Answer on a question. Requests you receive will show up here.</p>
                    
                    <button className="answerrequest-btn">See Top Questions</button>
                    
                </div>
                <div className="answerrequest-addtopics-section">
                    <h4>Add topics you know about</h4>

                    <p>Adding topics helps us find questions for you to answer</p>
                    <button className="answerrequest-addtopic-btn">Add topics</button>
                </div>
                
        </div>
        </div>
    )
}
export default AnswerRequests;