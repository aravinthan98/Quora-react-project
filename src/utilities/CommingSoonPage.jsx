import { useSelector } from "react-redux";
import commimgsoonlogo2 from '../assets/underConstruction2.png'
function CommingSoon(){
    const{darkMode}=useSelector((state)=>state.mode);
    return(
        <div className={`w-full h-screen  ${darkMode?"bg-neutral-900":"bg-zinc-50"}`}> 
            <div className="w-full h-screen flex items-center justify-center">
                <img src={commimgsoonlogo2} className="w-7/12 h-5/6 mt-10"/>
            </div>
        </div>
    )

}
export default CommingSoon;