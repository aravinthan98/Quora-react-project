import React,{useState,useEffect} from "react";
import './DiscoverSpaces.scss'

function DiscoverSpaces(){
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
        console.log("jsonData",jsonData);
        setPost(jsonData.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    return(
        <div className="discover-spaces-container">
            <div>
                <h2>Discover Spaces</h2>
                <h4>Spaces you might like</h4>
            </div>

            <div>
                <div className="space-cards-container">
                
                    {posts?.map((item)=>(
                        <div className="space-card" key={item._id}>
                            <div className="space-card-img">
                            <img src={item.channel.image} alt="space-imgae"/>
                            </div>
                            <div className="space-card-details">
                                <h4>{item.channel.name}</h4>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}
export default DiscoverSpaces;