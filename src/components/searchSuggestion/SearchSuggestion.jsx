import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentContext } from "../../context/currentContext";
import { Debounce } from "../../utilities/Debounce";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function SearchSuggestion({onClickModel,value,input}){
    const{searchVal,profile,selectedProfile,setSelectedProfile,selectedChannel,setSelectedChannel,selectedQuestion,setSelectedQuestion,relatedQuestion,setRelatedQuestion}=useCurrentContext();
    const[questionResults,setQuestionResults]=useState([]);
    const[answerResults,setAnswerResults]=useState([]);
    const[spaceResults,setSpaceResults]=useState([]);
    const[profileResults,setProfileResults]=useState([]);
    const{darkMode}=useSelector((state)=>state.mode)
    const navigate=useNavigate();
   
    const fetchQuestionData=async(val)=>{
       
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"title":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
           
            const newObjArr= response.data.data.map((item)=>({
              author_id:item.author._id,
              author_name:item.author.name,
              author_image:"https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png",
              title:item.title,
              content:item.content,
              likeCount:item.likeCount,
              commentCount:item.commentCount,
              id:item._id
           }));
            setQuestionResults(newObjArr);        
          } catch (error) {
            setQuestionResults([])
            console.error('Error fetching data:', error);

          }  

          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
            const newObjArr= response.data.data.map((item)=>({
              author_id:item.author._id,
              author_name:item.author.name,
              author_image:"https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png",
              title:item.title,
              content:item.content,
              likeCount:item.likeCount,
              commentCount:item.commentCount,
              id:item._id
           }));
           setAnswerResults(newObjArr);
          } catch (error) {
            setAnswerResults([])
            console.error('Error fetching data:', error);
          }
          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/channel?search={"name":"${val}"}&limit=10`, {
              headers: {
                'projectID': 'f104bi07c490'
              }
            });
            
            setSpaceResults(response.data.data);            
          } catch (error) {
            setSpaceResults([])
            console.error('Error fetching data:', error);
          }  
          try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/user?search={"name":"${val}"}&limit=10`, {
              headers: {
                'Authorization': `Bearer ${profile.token}`,
                'projectID': 'f104bi07c490'
              }
            });
          
            setProfileResults(response.data.data);
            console.log("profile",response);
          } catch (error) {
            setProfileResults([])
            console.error('Error fetching data:', error);
          }  
    }
    const handleTypeHead = () => {  
      if (input) {
       
        fetchQuestionData(input);
      } 
      else{
        setQuestionResults([])
        setAnswerResults([])
        setSpaceResults([])
        setProfileResults([])
      }
  
    };
    const handleProfile=(item)=>{
      setSelectedProfile({
          ...selectedProfile,
          profileName:`${item.name}`,
          id:`${item._id}`,
          image:`${item.profileImage?item.profileImage:""}`
      })
      onClickModel();
           
  }
  const handleSpaceNavigation=(item)=>{
    setSelectedChannel({
      ...selectedChannel,
      channelName:`${item.name}`,
      id:`${item._id}`,
      image:`${item.image}`

    })
    onClickModel();
  }
  const handleQuestion=(item)=>{    
    setSelectedQuestion({
      ...selectedQuestion,
      title:item.title,
      id:item._id,
      commentCount:item.commentCount
    })
    setRelatedQuestion(questionResults)
    onClickModel();
    
  }

    const doDebouce= Debounce(handleTypeHead, 2000);
    useEffect(()=>{
      doDebouce()
    },[input])
    return(     
        <div className={`w-full absolute mt-0 z-50 max-h-72 overflow-y-hidden border-x border-solid ${darkMode?"bg-neutral-800 border-zinc-700 text-zinc-300":"bg-white border-zinc-300"}`}>
            <div className={`px-3 border-t border-solid border-slate-300  ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>
                <div className="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  <div className="flex items-center gap-2">
                    <GoSearch className={`text-2xl  ${darkMode?"text-gray-400":"text-gray-600"}`}/>
                    <p><span className=" text-gray-400">Search:</span> <span className="font-medium text-base">{input}</span></p>
                  </div>
                  
                </div>
            </div>
            <div>
              {questionResults.length!==0&&
                questionResults.map((item)=>(
                  <div key={item._id}>
                    <Link to='/question-detailpage' state={item}>
                    <div className="px-3 border-t border-solid border-slate-300 cursor-pointer"  onClick={()=>handleQuestion(item)}>
                        <div className="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                          <p>{item.title}</p>
                        </div>
                    </div>
                    </Link>
                  </div>
                ))
                
              }
            </div>
            <div>
              {profileResults&&
                profileResults.map((item)=>(
                  <div key={item._id}>
                 <Link to='/profile' state={`${item._id}`}> <div className="px-3 border-t border-solid border-slate-300 cursor-pointer" onClick={()=>handleProfile(item)}>
                      <div className="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        <div className="flex gap-2">
                          <div className="rounded-full">
                            <img src={item.profileImage?item.profileImage:"https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"} className=" w-6 rounded-full"/>
                          </div>
                          <div>
                          <p><span className=" text-gray-400">Profile:</span> <span className="font-medium text-base">{item.name}</span></p>
                          </div>
                        </div>
                      </div>
                  </div>
                  </Link>
                  </div>
                ))
              }
            </div>
            <div>
            {spaceResults&&
                spaceResults.map((item)=>(
                  <div key={item._id} >
                  <Link to='/channel_detail_page' state={`${item._id}`}>
                  <div className="px-3 border-t border-solid border-slate-300 cursor-pointer"  key={item._id} onClick={()=>handleSpaceNavigation(item)}>
                      <div className="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        <div className="flex gap-2">
                          <div className="rounded-lg">
                            <img src={item.image?item.image:"https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png"} className=" w-6 rounded-lg"/>
                          </div>
                          <div>
                          <p><span className=" text-gray-400">Space:</span> <span className="font-medium text-base">{item.name}</span></p>
                          </div>
                        </div>
                      </div>
                  </div>
                  </Link>
                  </div>
                ))
              }
            </div>
        </div>

    )
}
export default SearchSuggestion;