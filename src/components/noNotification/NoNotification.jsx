import React from "react";
import './NoNotification.scss';
function NoNotification(){
    return (
        <div className="no-notification-section">
            <div className="no-noti-content">
                <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.no_notification_lightmode.png-26-9e0ef76620dd73d3.png" alt="no-notfication-icon"/>
                <h2>No New Notifications</h2>
                <p>Notifications you received in the last 30 days will show up here.</p>
            </div>
        </div>
    )
}
export default NoNotification;