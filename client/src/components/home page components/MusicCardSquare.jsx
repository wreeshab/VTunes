import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const MusicCardSquare = ({ image, name, id, audioUrl, artist, lyrics, djMode }) => {
  // console.log(lyrics);
  const { setTrackAndPlay, queue, addToQueue, clearQueue } =
    useContext(PlayerContext);

  return (
    <div
      id={id}
      className="min-w-[180px] w-[10%] py-5 p-2 px-3 bg-white/15 text-teal-500 hover:bg-teal-500/40 hover:text-white rounded-xl cursor-pointer flex flex-col shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out"
      onClick={(e) => {
        clearQueue();
        addToQueue([{ name, thumbnailUrl: image, audioUrl, artist }]);
        setTrackAndPlay(audioUrl, {
          name,
          image,
          artist: artist.name,
          lyrics: lyrics,
          djMode: djMode ? djMode : 0,
        });
      }}
    >
      <img src={image} className="mx-auto rounded-md w-36 h-36" alt={name} />
      <div className="mt-2 flex flex-col items-center">
        <p className="mt-2 mb-1 text-center text-lg">{name}</p>
        <p className="text-center text-sm font-light">by {artist.name}</p>
      </div>
    </div>
  );
};

export default MusicCardSquare;
