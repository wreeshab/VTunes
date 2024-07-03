import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 text-xl  flex-col gap-3  hidden bg-teal-700 text-white lg:flex ">
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
          <div className="flex items-center gap-3">
            <FaUserFriends />
            <p className="font-semibold">Your Friends</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between mt-5 ">
          <div className="flex items-center gap-3">
            <FcLike />
            <p className="font-semibold">Liked Songs</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between mt-5">
          <div className="flex items-center gap-3">
            <BiSolidPlaylist />
            <p className="font-semibold">Your Playlists</p>
          </div>
          <div className="flex items-center gap-3 mr-2 relative ">
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
