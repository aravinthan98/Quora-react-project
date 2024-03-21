
import './NotificationPage.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import NoNotification from "../noResultsModules/NoNotification";
function Notifications(){   
    const{darkMode}=useSelector((state)=>state.mode)
    const[component,setComponent]=useState('All Notifications')
   
   
    return(
        <div className="notification-page dark:bg-neutral-900 dark:text-zinc-400 bg-white text-zinc-800">
            <div className="notification-page-container lg:pt-8 lg:mt-12 mt-24 pt-8">
                <div className="notification-sidenav lg:block hidden">               
                    <div className="question-lefttitle">Filter</div>
                    <div className={component==="All Notifications"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('All Notifications')}>All Notifications</div>              
                    <div className={component==="Stories"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Stories')}>Stories</div>                   
                    <div className={component==="Question"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Question')}>Questions</div>
                    <div className={component==="Spaces"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Spaces')}>Spaces</div>                   
                    <div className={component==="People Updates"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('People Updates')}>People updates</div>                    
                    <div className={component==="Comments and mentions"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Comments and mentions')}>Comments and mentions</div>                         
                    <div className={component==="Upvotes"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Upvotes')}>Upvotes</div>                  
                    <div className={component==="Your content"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Your content')}>Your content</div>                  
                    <div className={component==="Your profile"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Your profile')}>Your profile</div>                    
                    <div className={component==="Announcements"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Announcements')}>Announcements</div>                    
                    <div className={component==="Earnings"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Earnings')}>Earnings</div>                  
                    <div className={component==="Subscriptions"?"selected-q-tab":"q-left-flex"} onClick={()=>setComponent('Subscriptions')}>Subscriptions</div>                    
                </div>
                <div className="lg:w-1/2 lg:ml-80 w-full ml-2 ">
                    <div className="lg:w-4/5 font-sans w-full">
                        <div className="w-full px-0 pt-4 pb-3 border-b border-solid dark:border-zinc-600 border-zinc-300">
                            <div className="w-full flex justify-between">
                                <div className=" font-medium">{component}</div>
                                <div className="text-[13px]">Settings</div>
                            </div>
                        </div>
                    <div >
                        <NoNotification/>
                    </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Notifications;