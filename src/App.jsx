
import { Routes, Route } from "react-router-dom";
import './App.css'
import QuestionPage from './components/questionsPage/QuestionPage';
import Layout from "./Layout";
import CurrentProvider from "./context/currentContext";
import Spaces from "./components/spaces/SpacesPage";
import AnswerRequests from "./components/questionsPage/AnswerRequests";
import Draft from "./components/questionsPage/Drafts";
import QuestionsForU from "./components/questionsPage/QuestionForU";
import Notifications from "./components/notificationPage/NotificationPage";
import FollowingPage from "./components/followingPage/FollowingPage";
import Login from "./components/login/Login";
import SearchResultsPage from "./components/searchResults/SearchResultsPage";
import ChannelDetailPage from "./components/channelDetailPage/ChannelDetailPage";
import ProfileDetailsPage from "./components/profileDetailsPage/ProfileDetailsPage";
import SpaceDetailPage from "./components/spaceDetailsPage/SpaceDetailPage";
import QuestionDetailPage from "./components/questionDetailPage/QuestionDetailPage";
import CommingSoon from "./utilities/CommingSoonPage";
import MyProfile from "./components/myProfile/MyProfile";
import HomePage from "./components/homePage/HomePage";

function App() {
  
  return (
    <div className="App">
      <CurrentProvider>
    
      <Layout>
        <Routes>
          <Route exact path="/" Component={HomePage}/>
          <Route path="following" element={<FollowingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/answer" element={<QuestionPage/> }>
            <Route path="" element={<QuestionsForU/>}/>
            <Route path='request' element={<AnswerRequests/>}/>
            <Route path="draft" element={<Draft/>}/>
           </Route>
          <Route path='/spaces' element={<Spaces/>}/>
          <Route path="/notifications" element={<Notifications/>}/> 
          <Route path="/search_results" element={<SearchResultsPage/>}/>
          <Route path="/channel_detail_page" element={<ChannelDetailPage/>}/>
          <Route path="/profile" element={<ProfileDetailsPage/>}/>
          <Route path="/topic" element={<SpaceDetailPage/>}/>
          <Route path="/question-detailpage" element={<QuestionDetailPage/>}/>
          <Route path="/CommingSoon" element={<CommingSoon/>}/>
          <Route path="/myprofile" element={<MyProfile/>}/>
        </Routes>
      </Layout>
      </CurrentProvider> 
    </div>
  )
}

export default App
