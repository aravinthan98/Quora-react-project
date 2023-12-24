import { useSelector } from "react-redux";
import { FaRegCheckCircle } from "react-icons/fa";
function LanguageSection(){
    const{darkMode}=useSelector((state)=>state.mode)
    return(
        <div className={`absolute w-56 top-14 border border-solid ${darkMode?"bg-neutral-800 border-zinc-600":"bg-white border-zinc-200"}`}>
            <div className={`py-2 px-4 border-b border-solid ${darkMode?"border-neutral-600 text-zinc-300":"border-neutral-200 text-gray-800"}`}>Languages</div>
            <div className="flex px-3 py-3 items-center justify-between">
                <div className="flex gap-2">
                    <div className="bg-blue-500 rounded-full flex justify-center items-center w-8 h-8"><div className="grid place-items-center text-white">EN</div></div>
                    <div className={`flex justify-center items-center ${darkMode?"text-zinc-300":"text-gray-800"}`}>English</div>
                </div>
                <div className="text-blue-500 text-lg">
                <FaRegCheckCircle />
                </div>
            </div>
        </div>
    )
}
export default LanguageSection;