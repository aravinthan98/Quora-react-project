import React,{useState,useEffect} from "react";
import {TbSquareAsteriskFilled} from 'react-icons/tb';
import QuestionPageAddTopicSection from "./QuestionPageAddTopic";
import { useCurrentContext } from "../../context/currentContext";
import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
function QuestionsForU(){
  const [posts, setPost] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=5', {
        headers: {
          'projectID': 'f104bi07c490'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();    
      setPost(jsonData.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);
    return(
        <div className="flex lg:gap-8 gap-1 transition-all duration-500 ease-in-out">
            <div className="font-sans  border border-solid w-full lg:w-full dark:bg-neutral-800 dark:border-zinc-700 bg-[#fff]  border-zinc-300">
            <div className="flex px-4 py-2 border border-solid  dark:text-zinc-400 dark:border-zinc-700 border-zinc-300">
                <TbSquareAsteriskFilled className=" text-3xl text-red-600 bg-[#fff] rounded-md"/>
                <p className=" pl-1 text-sm m-0 flex items-center">Questions for you</p>
            </div>
            <div>
            {posts.map((item)=>(
              <QuestionCard postData={item} key={item._id}/>
            ))}
            </div>
            </div>
            <div>
              <QuestionPageAddTopicSection/>
            </div>
           
        </div>
    )
}
export default QuestionsForU;