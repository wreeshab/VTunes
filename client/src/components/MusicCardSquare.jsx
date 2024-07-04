import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const MusicCardSquare = ({ image, name, id, audioUrl, artist }) => {
  const { setTrackAndPlay } = useContext(PlayerContext); // Destructure setTrackAndPlay

  return (
    <div
      id={id}
      className="min-w-[180px] w-[10%] py-5 p-2 px-3 bg-white text-teal-900 hover:bg-teal-500 hover:text-white rounded-xl cursor-pointer  flex flex-col  "
      onClick={(e) => {
        setTrackAndPlay(audioUrl, { name, image, artist: artist.name }); // Use the new function
      }}
    >
      <img src={image} className="mx-auto rounded-xl w-36 h-36  " alt="" />
      <div className="mt-2 flex flex-col items-start">
        <p className="font-bold mt-2 mb-1 text-center text-lg">{name}</p>
        <p className="text-center text-sm font-light">by {artist.name}</p>
      </div>
    </div>
  );
};

export default MusicCardSquare;
