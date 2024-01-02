import React,{ useState,useEffect } from "react";
import { useCurrentContext } from "../../context/currentContext";
import UserProfilePost from "./UserProfilePost";

function UserPosts({id}){
    const{profile}=useCurrentContext()
    const[posts,setPosts]=useState([]);
  
const getposts=(id)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${profile.token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://academics.newtonschool.co/api/v1/quora/user/${id}/posts?limit=10`, requestOptions)
    .then(response => response.json())
    .then((result) =>{        
        const newObjArr= result.data.slice(0,10).map((item)=>({
            author_id:item.author,
            title:item.title,
            content:item.content,
            post_image:`${item.images?item.images[0]:""}`,
            likeCount:'',
            commentCount:'',
            id:item._id
          }))
        setPosts(newObjArr);
        })
    .catch(error => console.log('error', error));
}
    useEffect(()=>{         
        getposts(id); 
    },[])
return(
    <div>
       {posts.length!==0?(posts.map((item)=>(
        <UserProfilePost postData={item} key={item.id}/>
       ))):(<div className=" text-center">No data found</div>)}
    </div>
)
}
export default UserPosts;
