import React from "react";

const PlaylistPageCard = ({ playlist }) => {
  return (
    <div className="bg-gradient-to-r w-full md:w-4/5 from-teal-500 to-teal-300 p-4 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer transition transform hover:scale-105">
      <img
        src={playlist.thumbnail}
        alt={playlist.name}
        className="w-16 h-16 rounded-md object-cover"
      />
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-800">{playlist.name}</h2>
        <p className="text-sm md:text-base text-gray-600">Created by: {playlist.owner}</p>
      </div>
    </div>
  );
};

export default PlaylistPageCard;
