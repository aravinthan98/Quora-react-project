import React from "react";
function NoNotification(){
    return (
        <div className="box-border flex h-auto text-center px-6 py-4 justify-center items-center">
            <div className="box-border py-6 flex flex-col justify-center items-center">
                <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.no_notification_lightmode.png-26-9e0ef76620dd73d3.png" className=" w-24" alt="no-notfication-icon"/>
                <h2 className="mb-2 text-lg">No New Notifications</h2>
                <p className="mb-6 text-sm" >Notifications you received in the last 30 days will show up here.</p>
            </div>
        </div>
    )
}
export default NoNotification;