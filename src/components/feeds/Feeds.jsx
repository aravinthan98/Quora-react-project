import React, { useEffect, useState } from "react";
// import Post from "../post/Post";

import "./Feeds.scss";
import QueryBox from "../quaryBox/QueryBox";
import Post from "../posts/posts";


const Feed = () => {
  const [posts, setPost] = useState([]);

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
      setPost(jsonData.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log("render")
    fetchData();
  }, []);

//   console.log(posts);

  return (
    <div className="feed">
      <QueryBox />
        {posts.map((item)=>(
            <Post key={item._id}  postData={item} />
        )

        )
        }
        
    </div>
  );
};

export default Feed;
