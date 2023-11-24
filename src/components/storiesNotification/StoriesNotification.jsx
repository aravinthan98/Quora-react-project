import React from "react";
import './StoriesNotification.scss';
import NoNotification from "../noNotification/NoNotification";

function StoriesNotification(){

    return(
        <div className="notification-container-for-all">
            <div className="note-for-all-topbar">
                <div className="note-topbar-sec">
                    <div className="note-topbar-title">Stories</div>
                    <div className="note-topbar-stg">Settings</div>
                </div>
            </div>
            <div className="notification-cards">
                <NoNotification/>
            </div>

        </div>
    )

}
export default StoriesNotification;