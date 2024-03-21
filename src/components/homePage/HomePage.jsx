import React from "react";
import Feed from "../feeds/Feeds";
import AdvertisementSection from "../advertisement/AdvertisementSection";
import Sidebar from "../sidebar/Sidebar";

function HomePage() {
  return (
    <div className="lg:mt-12 mt-24 w-full mx-0 p-0 transition-all duration-500 ease-in-out dark:bg-neutral-900 bg-gray-100">
      <div className="lg:flex lg:w-10/12 lg:mx-auto lg:pl-1 lg:pr-6 pt-4 w-full px-2 relative mx-0 ">
        <Sidebar />     
       <Feed />    
       <AdvertisementSection />
       
      </div>
    </div>
   
  );
}

export default HomePage;
