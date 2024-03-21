import EmptyFeed from "../noResultsModules/EmptyFeed";
import Sidebar from "../sidebar/Sidebar";
function FollowingPage(){
    return (
    <div className="lg:mt-12 mt-24 dark:bg-neutral-900 bg-gray-100">
        <div className="flex w-10/12 pt-4 pl-3 pr-6 mx-auto relative max-sm:w-full">
          <Sidebar /> 
          <div className="sm:w-[55%] sm:mx-4 w-full">   
          <EmptyFeed/>
          </div>
        </div>
      </div>
    )
}

export default FollowingPage;