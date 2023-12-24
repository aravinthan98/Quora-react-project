import ProfilePostModel from "./ProfilePostModel";
import React,{useState,useEffect} from "react";
import { useCurrentContext } from "../../context/currentContext";

function ProfilePost(){
    const{profile,selectedProfile}=useCurrentContext()
    const[posts,setPosts]=useState([]);
    

const getposts=()=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${profile.token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://academics.newtonschool.co/api/v1/quora/user/${profile.id}/posts?limit=10`, requestOptions)
    .then(response => response.json())
    .then((result) =>{ 
        
        const newObjArr= result.data.slice(0,10).map((item)=>({
            author_id:item.author,
            author_name:selectedProfile.profileName,
            author_image:selectedProfile.image,
            title:item.title,
            content:item.content,
            post_image:item.images[0]||null,
            likeCount:'',
            commentCount:'',
            id:item._id
          }))
        setPosts(newObjArr);
        })
    .catch(error => console.log('error', error));
}
    useEffect(()=>{
       
     getposts();
        
    },[])
return(
    <div>
       {posts.map((item)=>(
        <ProfilePostModel postData={item} key={item.id} postfetch={getposts}/>
       ))}
    </div>
)
}
export default ProfilePost;