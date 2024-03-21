import React,{useState,useEffect} from "react";
import './DiscoverSpaces.scss'
import axios from "axios";
import { Link } from "react-router-dom";
import { useCurrentContext } from "../../context/currentContext";
function DiscoverSpaces(){
  
  const [posts, setPost] = useState([]);
  const{selectedChannel,setSelectedChannel}=useCurrentContext();
  const bgArray=["https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_gray.png-26-1f9c20337a735e4b.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_green.png-26-f0b46f18277322da.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_blue.png-26-4eaf49a49fb008b5.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_pink.png-26-f43043a77377c880.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_purple.png-26-393b83ec10df6ce9.png"];
  const dpArray=["https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_gray.png-26-a461963c75474740.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_yellow.png-26-fe83a11d61dd4889.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_green.png-26-4020b62698aa9121.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_blue.png-26-59bea7960fef2c75.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_pink.png-26-b775bb30fc463837.png",
  "https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_purple.png-26-6ea9822273dc841e.png"];
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
                
                    {posts?.map((item,index)=>(
                      <div key={item._id} className="">
                        <Link to='/channel_detail_page' state={`${item._id}`}>
                          <div className="space-card relative cursor-pointer border border-solid shadow dark:bg-neutral-800 dark:border-zinc-700 bg-white border-gray-300"  onClick={()=>handleSpaceNavigation(item)}>
                            <div className="space-card-img">
                            <img src={item.image?item.image:bgArray[index%bgArray.length]} alt="space-imgae"/>
                            </div>
                            <div className="flex justify-center items-center absolute top-7 w-44">
                              <div className="box-border w-11 h-11 rounded-xl flex justify-center items-center dark:bg-neutral-800 bg-white">
                                <img src={item.image?item.image:dpArray[index%dpArray.length]} alt="s-logo" className="w-10 h-10 rounded-xl"/>
                              </div>
                            </div>
                            <div className="space-card-details ">
                                <h4>{item.name}</h4>
                                <p className="text-sm dark:text-neutral-400 text-neutral-900">{item.description}</p>

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