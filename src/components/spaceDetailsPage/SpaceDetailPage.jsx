import { LiaAddressCardSolid } from "react-icons/lia";
import Sidebar from "../sidebar/sidebar";
function SpaceDetailPage(){
    return(
        <div className="bg-gray-100">
            <div className="w-10/12 pt-4 px-6 mx-auto">
                <div className="flex">
                <div className="w-32">
                    <Sidebar />
                </div>              
                <div className="w-7/12 ml-8">
                    <div className="flex p-4 mb-2 box-border bg-white  rounded">
                        <div>
                            <img src="https://qph.cf2.quoracdn.net/main-thumb-t-263646-100-wlcywjzsksxbiwrdjeskeqepsqsmkbwp.jpeg" className="w-20 h-20 rounded"/>
                        </div>
                        <div className="flex flex-col justify-around ml-4">
                            <div className="text-zinc-800 leading-normal font-bold text-xl">Bollywood Actors and Actresses</div>
                            <div className="flex py-px box-border h-7 justify-start">               
                                <button className="flex box-border px-3 rounded-full border border-solid border-blue-500 text-sky-500 gap-1 justify-center items-center" ><LiaAddressCardSolid className="flex justify-center items-center"/> Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-slate-400 border-b border-solid border-neutral-300 ">
                        <div className="py-4 px-2">Read</div>
                        <div className="py-4 px-2">Answer</div>
                        <div className="py-4 px-2">Most Viewed writers</div>
                    </div>
                    <div className="box-border  border border-solid border-neutral-300 bg-white rounded mt-2">

                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default SpaceDetailPage;