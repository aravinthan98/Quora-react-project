import React from "react";
import './ProfileDetailsPage.scss';
import { PiUserSquare } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiQuestionnaireLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdBusinessCenter } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { LuEye } from "react-icons/lu";
import { BsGlobe } from "react-icons/bs";
import { LuCalendar } from "react-icons/lu";

function ProfileDetailsPage(){

    return(
        <div className="profile_Details-Page-section">
            <div className="profile_Details-sec">
                <div className="profile_Details-sec-left">
                    <div className="profile-detail-top">
                        <div className="profile-detail-top-first">
                            <div className="profile-detail-top-logo">
                                <img src="https://qph.cf2.quoracdn.net/main-thumb-275728939-200-jdutibgbzwystunfsjqdjhesjvyiagik.jpeg" alt="profile-image"/>
                            </div>
                            <div className="profile-detail-top-detail">
                                <h2>Manisha Kanoria</h2>
                                <p>Civil Engineer</p>                               
                                <div className="follower-count">7,102 followers 451 following</div>
                                <div className="profile-detail-top-btns-sec">
                                    <div><PiUserSquare /> Follow</div>
                                    <div><IoNotificationsOutline /> Notify</div>
                                    <div><RiQuestionnaireLine /> ask</div>
                                    <div><HiOutlineDotsHorizontal /></div>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="profile-detail-top-second">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa excepturi asperiores est. Quos ratione, harum vitae doloribus rem a reprehenderit explicabo cupiditate veniam. Accusamus exercitationem inventore commodi hic amet minima?</p>
                        </div>
                    </div>
                    <div className="profile-detail-bottom">
                        <div className="profile-detail-bottom-nav">
                            <div>Profile</div>
                            <div>Answer</div>
                            <div>Question</div>
                            <div>Posts</div>
                            <div>Followers</div>
                            <div>Following</div>
                            <div>More</div>
                        </div>
                        <div className="profile-detail-bottom-content">

                        </div>
                    </div>  
                </div>
                <div className="profile_Details-sec-right">
                    <div className="profile_Details-highlights">
                        <div className="profile_Details-right-head">Credentials & Highlights</div>
                        <div className="profile_Details-right-about">
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon" ><MdBusinessCenter /></div><div className="profile_Details-c-des"> Software Engineer at Copado</div></div>
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon"><LuGraduationCap /></div><div className="profile_Details-c-des"> Studied Computer Science Engineering at</div></div>
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon"><SlLocationPin /></div><div className="profile_Details-c-des"> Lives in Kolkata, West Bengal, India1996</div></div>
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon"><LuEye /></div><div className="profile_Details-c-des"> 324.7M content view</div></div>
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon"><BsGlobe /></div><div className="profile_Details-c-des"> Knows Bengali</div></div>
                            <div className="profile_Details-credentials-div"><div className="profile_Details-c-icon"><LuCalendar /></div><div className="profile_Details-c-des">Joined August 2020</div></div>
                        </div>
                    </div>
                    <div className="profile_Details-spaces"></div>
                </div>
            </div>
        </div>
    )
}
export default ProfileDetailsPage;