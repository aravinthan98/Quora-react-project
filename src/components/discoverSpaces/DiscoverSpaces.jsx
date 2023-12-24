import React,{useState,useEffect} from "react";
import './DiscoverSpaces.scss'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
import { useSelector } from "react-redux";

function DiscoverSpaces(){
  
  const [posts, setPost] = useState([]);
  const{selectedChannel,setSelectedChannel}=useCurrentContext();
  const{darkMode}=useSelector((state)=>state.mode)

  const getSpaces=async()=>{
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/quora/channel?limit=10', {
        headers: {
          'projectID': 'f104bi07c490'
        }
      });
   
      setPost(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  }
  useEffect(()=>{
    getSpaces()
  },[])
    const handleSpaceNavigation=(item)=>{
      setSelectedChannel({
        ...selectedChannel,
        channelName:`${item.name}`,
        id:`${item._id}`,
        image:`${item.image}`

      })
    }

    return(
        <div className="discover-spaces-container pt-8 ml-2">
            <div>
                <h2 className="font-bold text-xl">Discover Spaces</h2>
                <h4 className="mt-2 mb-4 py-2 font-medium text-sm">Spaces you might like</h4>
            </div>

            <div>
                <div className="space-cards-container lg:grid-cols-4 min-[890px]:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 min-[353px]:grid-cols-2 grid-cols-1 place-items-center grid">
                
                    {posts?.map((item)=>(
                      <div key={item._id} className="">
                        <Link to='/channel_detail_page' state={`${item._id}`}>
                          <div className={`space-card relative cursor-pointer border border-solid shadow ${darkMode?" bg-neutral-800 border-zinc-700":"bg-white border-gray-300"}`}  onClick={()=>handleSpaceNavigation(item)}>
                            <div className="space-card-img">
                            <img src={item.image} alt="space-imgae"/>
                            </div>
                            <div className="flex justify-center items-center absolute top-7 w-44">
                              <div className={`box-border w-11 h-11 rounded-xl flex justify-center items-center  ${darkMode?"bg-neutral-800":"bg-white"}`}>
                                <img src={item.image} alt="s-logo" className="w-10 h-10 rounded-xl"/>
                              </div>
                            </div>
                            <div className="space-card-details ">
                                <h4>{item.name}</h4>
                                <p className={`text-sm ${darkMode?"text-neutral-400":"text-neutral-900"}`}>{item.description}</p>

                            </div>
                          </div>
                        </Link>
                      </div>

                    ))}
                </div>
            </div>
        </div>
    )
}
export default DiscoverSpaces;