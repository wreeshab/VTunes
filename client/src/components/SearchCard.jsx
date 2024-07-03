import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

const SearchCard = ({ type, object }) => {
  if (type === "artists") {
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex items-center gap-3 ">
          <p className="font-bold rounded-full bg-white text-black p-2 w-7 h-7 flex items-center justify-center">
            {object.name[0].toUpperCase()}
          </p>
          <p className="font-semibold ">{object.name}</p>
        </div>
        <button>Follow</button>
      </div>
    );
  } else if (type === "users") {
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex items-center gap-3 ">
          <p className="font-bold rounded-full bg-white text-black p-2 w-7 h-7 flex items-center justify-center">
            {object.name[0].toUpperCase()}
          </p>
          <p className="font-semibold ">{object.name}</p>
        </div>
        <div>
          <FaUserFriends />
          <FaPlus />
        </div>
      </div>
    );
  } else if (type == "music") {
    const artistName = object.artist ? object.artist.name : "Unknown Artist";
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex gap-3">
          <div className="flex items-center gap-3 ">
            <img
              src={object.thumbnailUrl}
              className="w-10 h-10 rounded-2xl"
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold ">{object.name}</p>
            <p className="text-xs ">{artistName}</p>
          </div>
        </div>
        <div className="flex text-xl items-center gap-3">
          <BiDislike />
          <BiLike />
        </div>
      </div>
    );
  }
};

export default SearchCard;
