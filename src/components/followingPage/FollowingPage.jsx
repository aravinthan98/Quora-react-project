import EmptyFeed from "../emptyFeed/EmptyFeed";
import Sidebar from "../sidebar/sidebar";
import './FollowingPage.scss'
function FollowingPage(){
    return (
    <div className="following-page-sec">
        <div className="following-page-leftNav">
          <Sidebar />    
        </div>
        <div className="following-page-content">
            <EmptyFeed />
        </div>
      </div>
    )
}

export default FollowingPage;