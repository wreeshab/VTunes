import React from "react";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

const SongCardForArtist = ({ song }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center p-4  bg-gray-300/35 backdrop:blur-20 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-4">
      <img
        src={song.thumbnailUrl}
        alt="Thumbnail"
        className="w-24 h-24 rounded-md"
      />
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-semibold text-white py-2">{song.name}</h2>
        <p className="text-gray-900">
          {new Date(song.uploadedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-900">{song.genre}</p>
        <p className="text-gray-900">{song.language}</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-2xl font-semibold">
          <BiSolidLike className="text-green-500" />
          <span className="text-white">{song.likes.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-2xl font-semibold p-5">
          <BiSolidDislike className="text-red-500" />
          <span className="text-white">{song.dislikes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SongCardForArtist;
