import React from "react";
import './QuestionPageAddTopic.scss';
import {LuPen} from 'react-icons/lu'
function QuestionPageAddTopicSection(){

    return(
        <div className="q-pagetopicadd-sec">
            
            <div className="q-pagetopicadd-sec-title">
                <div>Topics you know about</div>
                <div className="add-topic-icone-sec">
                    <button className="add-topic-icone"><LuPen/></button>
                </div>
            </div>
            <div className="q-pagetopicadd-sec-content">
                <div className="q-pagetopicadd-sec-bottom">
                    <div className="q-pagetopicadd-sec-image">
                        <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png" alt="topic-icone"/>
                    </div>
                    <h4>No topics yet</h4>
                    <p>You’ll get better questions if you add more specific topics.</p>
                    
                    <button className="addtopic-btn">Add topics</button>
                    
                </div>
                
            </div>
        </div>
    )
}

export default QuestionPageAddTopicSection;