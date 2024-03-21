
import React,{useState} from "react";
import {BsQuestionSquare} from 'react-icons/bs';
import {SlNote} from 'react-icons/sl';
import {RxPencil1} from 'react-icons/rx';
import Modal from '@mui/material/Modal';
import { Avatar, Input } from "@mui/material";
import {MdOutlineExpandMore} from 'react-icons/md';
import {RiGroupLine} from 'react-icons/ri'
import { useCurrentContext } from "../../context/currentContext";
import CreatePostModel from "../modelsSection/CreatePostModel";
const QueryBox = () => {
  const{profile}=useCurrentContext();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModel=()=>{
    setOpenModal(!openModal);
  }
  return (
    <div className="flex flex-col px-2 pt-2 py-1 box-border border border-solid  cursor-pointer rounded transition-all duration-500 ease-in-out dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 bg-white border-slate-200 text-gray-950">
      <div className="flex box-border">
      <div className="flex justify-center items-center">
      <div className="w-9 h-9 mr-2 bg-red-900 text-white border-2 border-solid border-blue-500 rounded-full font-medium text-center text-2xl flex justify-center items-center">
              <div className="mb-0.5">{profile.userName[0].toUpperCase()}</div>
      </div>
      </div>
      <div className="flex box-border rounded-3xl w-full my-1 border border-solid  items-center dark:bg-zinc-800 dark:border-neutral-700 bg-gray-100 border-gainsboro" onClick={() => setOpenModal(true)}>
        <p className="text-base mx-2 py-1  dark:text-zinc-400 text-gray-400">What do you you want to ask or share?</p>
      </div>
      </div>
      <div className="flex w-full dark:text-neutral-400 text-zinc-800">
        <div className="w-full flex justify-center items-center text-[13px] font-medium px-2 rounded-3xl dark:hover:bg-neutral-700 hover:bg-slate-50" onClick={() => setOpenModal(true)}>
           <BsQuestionSquare/>
          <div className="ml-1">Ask</div>
        </div>
       <div className="box-border h-4 mx-1 my-2 flex items-center border-r border-solid border-slate-400"></div>
        <div className="w-full flex justify-center items-center text-[13px] font-medium px-2 rounded-3xl dark:hover:bg-neutral-700 hover:bg-slate-50" onClick={() => setOpenModal(true)}>
          <SlNote/>
          <div className="ml-1">Answer</div>
        </div>
        <div className="box-border h-4 mx-1 my-2 flex items-center border-r border-solid border-slate-400"></div>
        <div className="w-full flex justify-center items-center text-[13px] font-medium px-2 rounded-3xl dark:hover:bg-neutral-700 hover:bg-slate-50" onClick={() => setOpenModal(true)}>
          <RxPencil1/>
          <div className="ml-1">Post</div>
        </div>
        <CreatePostModel onClickModel={handleOpenModel} value={openModal}/>
      </div>
    </div>
  );
};

export default QueryBox;
