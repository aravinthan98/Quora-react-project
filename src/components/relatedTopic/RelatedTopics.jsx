import { useSelector } from "react-redux";
function RelatedTopics(){
    const{darkMode}=useSelector((state)=>state.mode)
    return(
        <div className={`box-border hidden lg:block lg:w-56 lg:ml-8 ${darkMode?"bg-neutral-800 text-zinc-300":"bg-white"}`}>
            <div className={`box-border border border-solid   ${darkMode?"border-zinc-600":"border-gray-300"}`}>
                <div className={`box-border px-4 py-2 border-b border-solid ${darkMode?"border-zinc-600":"border-gray-300"}`}>
                    Related Topics
                </div>
                <div className="text-center">
                    Comming soon
                </div>
            </div>
        </div>
    )
}
export default RelatedTopics;