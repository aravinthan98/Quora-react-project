import React from "react";
import { useSelector } from "react-redux";
import QuestionCard from "../questionsPage/QuestionCard";
 
function SearchResultQuestion({posts}){
    const{darkMode}=useSelector((state)=>state.mode);

    return(

      <div className="w-full m-0 p-0">
        <div >
            <div className={` font-sans border border-solid ${darkMode?"bg-neutral-800 text-zinc-300 border-zinc-600":"bg-white border-zinc-300"}`}>
            <div className={` py-2 px-4 flex border-b border-solid ${darkMode?"border-zinc-600":"border-zinc-300"}`}>
               
                <p>Result for</p>
            </div>
            {posts.map((item)=>(
              <QuestionCard postData={item} key={item._id}/>
           
            ))}
            </div>
        </div>
      </div>
    )
}
export default SearchResultQuestion;