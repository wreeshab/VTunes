import React from "react";
import { IoMdShuffle } from "react-icons/io";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { ImLoop } from "react-icons/im";

import { GiSpeakerOff } from "react-icons/gi";
import { HiMiniSpeakerWave } from "react-icons/hi2";

import { MdLyrics } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";



const TrackBar = () => {
  return (
    <div className="h-[10%] border-t-2 border-black  bg-lime-200 flex justify-between items-center text-black px-4 ">
      <div className="hidden lg:flex items-center gap-5 ">
        <img
          src="./images/deltaLogoGreen.png"
          className="h-[50px] w-[50px] bg-black"
        />
        <div>
          <p>Song Name</p>
          <p>Artist</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 m-auto">
        <div className="flex gap-6 ">
          <IoMdShuffle className="text-2xl" />
          <TbPlayerTrackPrevFilled className="text-2xl" />
          <FaPlay className="text-2xl" />
          <TbPlayerTrackNextFilled className="text-2xl" />
          <ImLoop className="text-2xl" />
        </div>
        <div className="flex items-center gap-5">
            <p>00:00</p>
            <div className="w-[60vw] max-w-[500px] bg-white rounded-full cursor-pointer" >
                <hr className="h-1 border-none w-10 bg-green-700 rounded-full" />
            </div>
            <p>03:56</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-4 opacity-80 mr-10"> 
        <HiMiniSpeakerWave className="text-2xl" />
        <MdLyrics className="text-2xl" />
        <HiOutlineQueueList className="text-2xl" />

      </div>
    </div>
  );
};

export default TrackBar;
