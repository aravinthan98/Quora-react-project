import React from "react";
import QuestionCard from "../questionsPage/QuestionCard";
 
function SearchResultQuestion({posts}){

    return(

      <div className="w-full m-0 p-0">
        <div >
            <div className="font-sans border border-solid dark:bg-neutral-800 dark:text-zinc-300 dark:border-zinc-600 bg-white border-zinc-300">
            <div className="py-2 px-4 flex border-b border-solid dark:border-zinc-600 border-zinc-300">
               
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