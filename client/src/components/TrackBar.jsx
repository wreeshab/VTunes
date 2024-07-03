import React, { useContext } from "react";
import { IoMdShuffle } from "react-icons/io";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { ImLoop } from "react-icons/im";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdLyrics } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { PlayerContext } from "../context/PlayerContext";

const TrackBar = () => {
  const {
    seekBar,
    seekBackground,
    playerStatus,
    pause,
    play,
    songDetails,
    time,
    seek,
  } = useContext(PlayerContext);

  return (
    <div className="pt-2 h-[10%] border-t-2 border-black  bg-teal-500 text-white flex justify-between items-center px-4 ">
      <div className="hidden lg:flex items-center gap-5 ">
        <img src={songDetails.image} className="h-[50px] w-[50px] bg-black" />
        <div>
          <p className="font-bold text-xl">{songDetails.name}</p>
          <p>{songDetails.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 m-auto">
        <div className="flex gap-6 ">
          <IoMdShuffle className="text-2xl" />
          <TbPlayerTrackPrevFilled className="text-2xl" />
          {playerStatus ? (
            <TbPlayerPauseFilled onClick={pause} className="text-2xl" />
          ) : (
            <FaPlay onClick={play} className="text-2xl" />
          )}
          <TbPlayerTrackNextFilled className="text-2xl" />
          <ImLoop className="text-2xl" />
        </div>
        <div className="flex items-center gap-5">
          {/* Displaying current time */}
          <p>{`${time.currentTime.minutes}:${time.currentTime.seconds
            .toString()
            .padStart(2, "0")}`}</p>
          <div
            ref={seekBackground}
            className="w-[60vw] max-w-[500px] bg-white rounded-full cursor-pointer"
            onClick={seek}
          >
            <hr
              ref={seekBar}
              className="h-1 border-none bg-green-700 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
          {/* Displaying duration */}
          <p>{`${time.duration.minutes}:${time.duration.seconds
            .toString()
            .padStart(2, "0")}`}</p>
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
