import React from "react";
import { useNavigate } from "react-router-dom";

const PublicPlaylistOnFriendPage = ({ playlist }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => navigate(`/dashboard/playlist/${playlist._id}`)}
      className="relative w-full aspect-square p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl hover:bg-opacity-30"
    >
      <img
        src={playlist.thumbnail}
        alt={playlist.name}
        className="w-full h-full object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
      />
      <p className="absolute bottom-2 left-2 text-md text-white font-bold shadow-md">
        {playlist.name}
      </p>
    </div>
  );
};

export default PublicPlaylistOnFriendPage;
