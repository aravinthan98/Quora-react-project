import React, { useEffect, useState } from "react";
import QueryBox from "../quaryBox/QueryBox";
import { useCurrentContext } from "../../context/currentContext";
import axios from "axios";
import LoadingSec from "../../utilities/LoadingSec";
import PostPage from "../posts/PostPage";

const Feed = () => {
  const [posts, setPost] = useState([]);
  const{profile,voteArray,setVoteArray}=useCurrentContext();
  const[Loading,setLoading]=useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/quora/post?limit=10 ', {
        headers: {
          'projectID': 'f104bi07c490'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      console.log("jsonData",jsonData);
     const newObjArr= jsonData.data.map((item)=>({
        author_id:item.author._id,
        author_name:item.author.name,
        author_image:item.author.profileImage,
        title:item.title,
        content:item.content,
        likeCount:item.likeCount,
        commentCount:item.commentCount,
        id:item._id
     }));
     fetchLikes();
      setPost(newObjArr);
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchLikes=async()=>{
       
    const likesArray = JSON.parse(localStorage.getItem('likesIds'));
    
    if(likesArray!==null){
      setVoteArray(likesArray)
   
    }
    
  }


  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      fetchData();
    },1000)
    
    
  }, []);

//   console.log(posts);

  return (
    <div className="lg:w-[55%] lg:mx-4 flex flex-col gap-2 w-full mx-0">
      <QueryBox />
      {
        Loading?
        (<div className="flex flex-col gap-4" >
        <LoadingSec/>
        <LoadingSec/>
        </div>):(<div>
          {posts.map((item)=>(
              <PostPage key={item.id}  postData={item} />
          ))
          }
        </div> )
      }

    </div>
  );
};

export default Feed;
