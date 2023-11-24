import React from "react";
import "./Quora.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import Feed from "../feeds/Feeds";
import Login from "../login/Login";





function Quora() {
  return (
    <div className="quora bg-gray-100">
      <div className="quora_content flex w-4/5 pt-4 mx-auto relative">
        <Sidebar />
       <Feed />
       
      </div>
    </div>
   
  );
}

export default Quora;
