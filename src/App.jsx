
import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/navbar/Navbar';
import QuestionPage from './components/questionsPage/QuestionPage';

import Quora from './components/quora/Quora';
import Layout from "./Layout";
import CurrentProvider from "./context/currentContext";
import Spaces from "./components/spaces/SpacesPage";
import AnswerRequests from "./components/answerRequest/AnswerRequests";
import Draft from "./components/drafts/Drafts";
import QuestionsForU from "./components/questionForU/QuestionForU";
import Notifications from "./components/notificationPage/NotificationPage";
import AllNotification from "./components/allNotification/AllNotification";
import SpacesNotifications from "./components/spacesNotification/SpacesNotifications";
import QuestionNotifications from "./components/qustionsNotification/QuestionNotifications";
import StoriesNotification from "./components/storiesNotification/StoriesNotification";
import PeopleNotifications from "./components/peopleNotification/PeopleNotification";
import CommentsNotification from "./components/commentsNotification/CommentsNotification";
import UpvotesNotifications from "./components/upvotesNotification/UpvoteNotification";
import YourContentNotifications from "./components/yourContentNotification/YourContentNotifications";
import YourProfileNotifications from "./components/yourProfileNotification/YourProfileNotifications";
import AnnouncementNotification from "./components/announcementNotification/AnnouncementNoification";
import EarningNotification from "./components/earningNotification/EarningNotification";
import SubscriptionNotifications from "./components/subscriptionNotification/SubscriptionNotification";
import FollowingPage from "./components/followingPage/FollowingPage";
import Login from "./components/login/Login";
import SearchResultsPage from "./components/searchResults/SearchResultsPage";
import ChannelDetailPage from "./components/channelDetailPage/ChannelDetailPage";
import ProfileDetailsPage from "./components/profileDetailsPage/ProfileDetailsPage";
import SpaceDetailPage from "./components/spaceDetailsPage/SpaceDetailPage";

function App() {
  
  return (
    <div className="App">
      <CurrentProvider>
    
      <Layout>
        <Routes>
          <Route path="/" element={<Quora/> }/>
          <Route path="following" element={<FollowingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/answer" element={<QuestionPage/> }>
            <Route path="" element={<QuestionsForU/>}/>
            <Route path='request' element={<AnswerRequests/>}/>
            <Route path="draft" element={<Draft/>}/>
           </Route>
          <Route path='/spaces' element={<Spaces/>}/>
          <Route path="/notifications" element={<Notifications/>}>
              <Route path="" element={<AllNotification/>}/>             
              <Route path="stories" element={<StoriesNotification/>}/>
              <Route path="write" element={<QuestionNotifications/>}/>
              <Route path="spaces" element={<SpacesNotifications/>}/> 
              <Route path="subscriptions" element={<PeopleNotifications/>}/>
              <Route path="direct" element={<CommentsNotification/>}/>
              <Route path="upvotes" element={<UpvotesNotifications/>}/>
              <Route path="your_content" element={<YourContentNotifications/>}/>
              <Route path="profile" element={<YourProfileNotifications/>}/>
              <Route path="announcements" element={<AnnouncementNotification/>}/>
              <Route path="earnings" element={<EarningNotification/>}/>
              <Route path="memberships" element={<SubscriptionNotifications/>}/>
          </Route>
          <Route path="/search_results" element={<SearchResultsPage/>}/>
          <Route path="/channel_detail_page" element={<ChannelDetailPage/>}/>
          <Route path="/profile" element={<ProfileDetailsPage/>}/>
          <Route path="/topic" element={<SpaceDetailPage/>}/>
        </Routes>
      </Layout>
      </CurrentProvider> 
    </div>
  )
}

export default App
