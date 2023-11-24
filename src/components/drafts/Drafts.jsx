import React from "react";

function Draft(){
    return (
        <div className="questionPage-main-section">
        <div className="answerrequest-sec-content">
            <div className="answerrequest-sec">
                <div className="answerrequest-sec-image">
                    <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png" alt="topic-icone"/>
                </div>
                <h3>No answer drafts</h3>
                <p>Start writing answers by finding questions to answer in Questions for You.</p>
                
                <button className="answerrequest-btn">See questions for you</button>
                
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
export default Draft;