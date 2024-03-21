import { useSelector } from "react-redux";
function RelatedTopics(){

    return(
        <div className="box-border hidden lg:block lg:w-56 lg:ml-8 dark:bg-neutral-800 dark:text-zinc-300 bg-white">
            <div className="box-border border border-solid dark:border-zinc-600 border-gray-300">
                <div className="box-border px-4 py-2 border-b border-solid dark:border-zinc-600 border-gray-300">
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