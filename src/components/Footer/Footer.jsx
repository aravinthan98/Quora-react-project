import React from "react";
function Footer(){
    return(
        <div className="text-slate-400 pt-2 pb-12 text-sm w-32 flex flex-wrap">
                <span className="px-1"><a href="https://www.quora.com/about">About</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.careers.quora.com/">Careers</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/about/tos">Terms</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/about/privacy">Privacy</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/about/acceptable_use">Acceptable Use</a></span>
                <span className="before:content-['·'] px-1"><a href="https://business.quora.com/">Businesses</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/press">Press</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/about/your_ad_choices">Your Ad choices</a></span>
                <span className="before:content-['·'] px-1"><a href="https://www.quora.com/about/grievance">Grievance Officer</a></span>               
                
        </div>
    )
}
export default Footer;