
import React from "react";
import './spacesPage.scss';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FaRegCompass} from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';
import DiscoverSpaces from "../discoverSpaces/DiscoverSpaces";

function Spaces(){
    return(
        <div className="spaces-section">
            <div className="space-container">
                <div className="space-top-sec">
                    <h3>Welcome to Spaces!</h3>
                    <p>Follow Spaces to explore your interests on Quora.</p>
                    <div className="space-top-sec-btns">
                            <div className="space-create-space-btn space-flex">
                                <AiOutlinePlusCircle/>
                                <h4>Create a Space</h4>
                            </div>
                            <div className="space-discover-space-btn space-flex">
                                <FaRegCompass/>
                                <h4>Discover Spaces</h4>
                            </div>
                    </div>

                </div>
                <div className="discover-spaces">
                    <DiscoverSpaces/>
                </div>
            </div>
            <div className="space-right-container">
                <div className="space-right-bar-title">Pending Invites</div>
                <div className="space-right-content">
                    <div className="space-right-content-noinvite">
                        <AiOutlineMail/>
                        <div>No Invites</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Spaces;