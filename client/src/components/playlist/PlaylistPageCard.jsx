import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const PlaylistPageCard = ({ playlist }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full md:w-4/5 p-2 px-4 rounded shadow-lg flex bg-white/15 items-center gap-4 cursor-pointer transition transform backdrop-blur-lg hover:bg-white/40"
      onClick={() => navigate(`/dashboard/playlist/${playlist._id}`)}
    >
      <img
        src={playlist.thumbnail}
        alt={playlist.name}
        className="w-10 h-10 rounded-md object-cover"
      />
      <div>
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-lg md:text-xl font-bold text-gray-100">
            {playlist.name}
          </h2>
          {playlist.private ? (
            <FaLock className="text-md md:text-sm text-yellow-500" />
          ) : null}
        </div>

        <p className="text-sm md:text-base text-white">
          Created by: {playlist.owner.name}
        </p>
      </div>
    </div>
  );
};

export default PlaylistPageCard;
