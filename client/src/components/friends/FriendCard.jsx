import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FriendCard = ({ friend, online }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/friend/${friend._id}`)}
      className="w-full md:w-[80%] bg-white/15 text-white flex flex-col items-center justify-between p-4 rounded my-2 cursor-pointer shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-white/20"
    >
      <div className="flex items-center justify-between w-full gap-3 mb-2">
        <div className="flex items-center gap-3">
          <FaUser className="text-4xl text-blue-500" />
          <p className="font-semibold text-lg">{friend.name}</p>
        </div>
        <p className="text-md">
          Status:{" "}
          {online ? (
            <span className="text-green-400">Online</span>
          ) : (
            <span className="text-red-400">Offline</span>
          )}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-sm text-gray-300">
            Joined: {friend.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray-800 p-2 rounded-lg">
          <p className="text-sm">Currently Playing:</p>
          {friend.currentlyPlaying?.name &&
          friend.currentlyPlaying?.image &&
          friend.currentlyPlaying?.artist &&
          online ? (
            <div className="flex items-center gap-3 bg-gray-900 p-2 rounded-lg">
              <img
                src={friend.currentlyPlaying.image}
                alt={friend.currentlyPlaying.name}
                className="w-12 h-12 rounded-md hidden lg:block"
              />
              <div className="text-left">
                <p className="text-md font-semibold text-blue-400">
                  {friend.currentlyPlaying.name}
                </p>
                <p className="text-sm text-gray-400">
                  {friend.currentlyPlaying.artist}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Nothing</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
