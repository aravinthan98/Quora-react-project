import React, { createContext, useState,useEffect } from 'react';
import { useContext } from 'react';
const CurrentContext = createContext();

const CurrentProvider = ({ children }) => {
    const[questionTabSelected,setQuestionTabSelected]=useState('QuestionForU');
    const[noteTabSelected,setNoteTabSelected]=useState('allNotification');
    const [login,setLogin]=useState(false);
    const[profile,setProfile]=useState({
        userName:"",
        image:"",
        token:"",
        id:"",
      })
    const[searchVal,setSearchVal]=useState('');
    const[selectedChannel,setSelectedChannel]=useState({
      channelName:"",
      id:"",
      image:""
    });
    const[selectedProfile,setSelectedProfile]=useState({
      profileName:"",
      id:"",
      image:""
    });
    const[selectedSpace,setSelectedSpace]=useState({
      spaceName:"",
      id:"",
      image:""
    });
    const[voteArray,setVoteArray]=useState([]);
    const[selectedQuestion,setSelectedQuestion]=useState({
      title:"",
      id:"",
      commentCount:""

    });
    const[relatedQuestion,setRelatedQuestion]=useState([]);
    
      useEffect(()=>{
        const userlog=JSON.parse(localStorage.getItem('userLogin'));
        if(userlog!==null){
          setProfile({
            ...profile,
            userName:`${userlog.userName}`,
            image:"",
            token:`${userlog.token}`,
            id:`${userlog.id}`
          })
          setLogin(true);
        }
      },[])
    return (
        <CurrentContext.Provider value={{questionTabSelected,setQuestionTabSelected,noteTabSelected,setNoteTabSelected,profile,setProfile,
        login,setLogin,searchVal,setSearchVal,selectedChannel,setSelectedChannel,selectedProfile,setSelectedProfile,selectedSpace,setSelectedSpace,
        voteArray,setVoteArray,selectedQuestion,setSelectedQuestion,relatedQuestion,setRelatedQuestion}}>
            {children}
        </CurrentContext.Provider>
    );
};
export default CurrentProvider;

export const useCurrentContext = () => {
    return useContext(CurrentContext);
  
}