import React from "react";

import NoNotification from "../noNotification/NoNotification";

function CommentsNotification(){

    return(
        <div className="notification-container-for-all">
            <div className="note-for-all-topbar">
                <div className="note-topbar-sec">
                    <div className="note-topbar-title">Comments and mentions</div>
                    <div className="note-topbar-stg">Settings</div>
                </div>
            </div>
            <div className="notification-cards">
                <NoNotification/>
            </div>

        </div>
    )

}
export default CommentsNotification;