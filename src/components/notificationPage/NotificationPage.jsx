import { Link, Outlet } from "react-router-dom";
import AllNotification from "../allNotification/AllNotification";
import { useCurrentContext } from "../../context/currentContext";
import StoriesNotification from "../storiesNotification/StoriesNotification";
import './NotificationPage.scss'
function Notifications(){

    const{noteTabSelected,setNoteTabSelected}=useCurrentContext();
   
    return(
        <div className="notification-page">
            <div className="notification-page-container">
                <div className="notification-sidenav">
                
                    <div className="question-lefttitle">Filter</div>
                    <Link to=""><div className={noteTabSelected==="allNotification"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('allNotification')}>All Notifications</div>
                    </Link>
                    <Link to="stories"><div className={noteTabSelected==="Stories"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Stories')}>Stories</div>
                    </Link>
                    <Link to="write"><div className={noteTabSelected==="Question"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Question')}>Questions</div>
                    </Link>
                    <Link to="spaces"><div className={noteTabSelected==="Spaces"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Spaces')}>Spaces</div>
                    </Link>
                    <Link to="subscriptions"><div className={noteTabSelected==="People"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('People')}>People updates</div>
                    </Link>
                    <Link to="direct"><div className={noteTabSelected==="Comments"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Comments')}>Comments and mentions</div>
                    </Link>       
                    <Link to="upvotes"><div className={noteTabSelected==="Upvotes"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Upvotes')}>Upvotes</div>
                    </Link>
                    <Link to="your_content"><div className={noteTabSelected==="YourContent"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('YourContent')}>Your content</div>
                    </Link>
                    <Link to="profile"><div className={noteTabSelected==="YourProfile"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('YourProfile')}>Your profile</div>
                    </Link>
                    <Link to="announcements"><div className={noteTabSelected==="Announcements"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Announcements')}>Announcements</div>
                    </Link>
                    <Link to="earnings"><div className={noteTabSelected==="Earnings"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Earnings')}>Earnings</div>
                    </Link>
                    <Link to="memberships"><div className={noteTabSelected==="Subscriptions"?"selected-q-tab":"q-left-flex"} onClick={()=>setNoteTabSelected('Subscriptions')}>Subscriptions</div>
                    </Link>
                    
                </div>
                <div className="notification-content">
                    {/* <StoriesNotification/> */}
                    {/* <AllNotification/> */}
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}
export default Notifications;