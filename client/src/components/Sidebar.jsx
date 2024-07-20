import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 text-xl  flex-col gap-3  hidden bg-black text-white lg:flex ">
      <div className=" h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center cursor-pointer gap-3 pl-8"
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
          <p className="font-semibold">Dashboard</p>
        </div>
        <div
          onClick={() => {
            navigate("/dashboard/search");
          }}
          className="flex items-center cursor-pointer gap-3 pl-8"
        >
          <FaMagnifyingGlass />
          <p className="font-semibold">Search</p>
        </div>
      </div>
      <hr className="w-[50%] m-auto   bg-black h-0.5 " />
      <div className=" h-[85%] rounded">
        <div className="p-4 flex items-center justify-between mt-5 ">
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/dashboard/friends")}
          >
            <FaUserFriends />
            <p className="font-semibold">Your Friends</p>
          </div>
        </div>
        <div
          className="p-4 flex items-center justify-between mt-5 cursor-pointer "
          onClick={() => navigate("/dashboard/liked-songs")}
        >
          <div className="flex items-center gap-3">
            <FcLike />
            <p className="font-semibold">Liked Songs</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between mt-5">
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/dashboard/all-playlists")}
          >
            <BiSolidPlaylist />
            <p className="font-semibold">Your Playlists</p>
          </div>
          <div className="flex items-center gap-3 mr-2 relative ">
            <FaPlus
              className="cursor-pointer"
              onClick={() => navigate("/dashboard/create-playlist")}
            />
          </div>
        </div>
        <div className="p-4 flex items-center justify-between mt-5">
          <div onClick={()=>navigate("/dashboard/party-mode/create-party")} className="flex items-center gap-3">
            <GiPartyPopper />
            <p className="font-semibold">Party Mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
