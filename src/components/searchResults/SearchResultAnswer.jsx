
import React, { useState } from "react";
import PostPage from "../posts/PostPage";


function SearchResultAnswer({postData}){
   

    return(
        <>
        {postData.map((item)=>(
            <PostPage key={item.id}  postData={item} />
        ))}
        </>
    )
}

export default SearchResultAnswer;