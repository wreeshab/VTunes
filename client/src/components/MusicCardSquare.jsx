import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const MusicCardSquare = ({ image, name, id, audioUrl, artist }) => {
  const { setTrackAndPlay } = useContext(PlayerContext); // Destructure setTrackAndPlay

  return (
    <div
      id={id}
      className="min-w-[180px] w-[10%] py-5 p-2 px-3 bg-white text-teal-900 hover:bg-lime-500 hover:tThe error message EADDRINUSE: address already in use :::5000 indicates that the port 5000, which your Node.js server is trying to listen on, is already in use by another process. This commonly happens when you have another instance of your server running or another application using the same port.

ext-white rounded-xl cursor-pointer  flex flex-col items-center "
      onClick={(e) => {
        setTrackAndPlay(audioUrl, { name, image, artist: artist.name }); // Use the new function
      }}
    >
      <img src={image} className="mx-auto rounded w-[80%]" alt="" />
      <p className="font-bold mt-2 mb-1 text-center">{name}</p>
    </div>
  );
};

export default MusicCardSquare;
